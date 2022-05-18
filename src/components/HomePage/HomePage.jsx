import React from "react";
import BtnGrp from "../BtnGrp/BtnGrp";
import DataTable from "../DataTable/DataTable";
import { CFEWrapper, HomePageLayout, CardsLayout} from "../../shared/styles";
import { getAllPublicGists } from "../../data/gists";
import moment from 'moment';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      view: "table",
      tableData: [],
    };
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
    this.handleOnPaginationChange = this.handleOnPaginationChange.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
  }

  handleOnSelectChange({ selectedRowKeys }) {
    this.setState({ selectedRowKeys: [selectedRowKeys] });
  }
  handleOnPaginationChange(currentPage){
    console.log(currentPage)
    this.getAllPublicGists(currentPage)
  }

  onViewChange(selectedView) {
    console.log(selectedView);
    this.setState({ view: selectedView });
  }

  getAllPublicGists(page=1){
    this.setState({loading: true})
    
    getAllPublicGists(page)
      .then((res) => {
        return res.map((gist) => { //iffe
          return {
            url: gist.url,
            id: gist.id,
            gist_files: gist.files,
            gist_description: gist.description,
            name: gist.owner.login,
            date: moment(gist.created_at).format('DD-MM-YYYY'),
            time:  moment(gist.created_at).format("HH:mm"),
            keyword: gist.description,
            notebook: [...Object.keys(gist.files)],
            owner: gist.owner,
            key: gist.id
          };
        });
      })
      .then((gistsArray) => {
        this.setState({tableData: gistsArray, loading: false});
        return gistsArray;
      });
  }

  componentDidMount() {
    this.getAllPublicGists()
  }

  render() {
    return (
      <HomePageLayout>
        <CFEWrapper>
          <BtnGrp onViewChange={this.onViewChange} view={this.state.view} />
        </CFEWrapper>
        <div>
          {this.state.view === "table" ? (
            <DataTable
              handleOnSelectChange={this.handleOnSelectChange}
              onPaginationChange = {this.handleOnPaginationChange}
              dataSource={this.state.tableData}
              loading={this.state.loading}
              selectedRowKeys={this.state.selectedRowKeys}
            />
          ) : (
            <CardsLayout>

            </CardsLayout>
          )}
        </div>
      </HomePageLayout>
    );
  }
}
