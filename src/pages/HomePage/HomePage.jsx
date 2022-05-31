import React from "react";
import {
  CFEWrapper,
  HomePageLayout,
  CardsLayout,
  UserCard,
  CardViewLayout,
} from "../../shared/styles";
import { Card, Pagination } from "antd";
import BtnGrp from "../../components/BtnGrp/BtnGrp";
import GistPreview from "../../components/GistPreview/GistPreview";
import DataTable from "../../components/DataTable/DataTable";
import { fetchPublicGists, selectAllGists, selectGistsError, selectGistsStatus } from "../../redux/gistSlice";
import { connect } from "react-redux";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      loading: false,
      view: "table",
    };
    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
    this.handleOnPaginationChange = this.handleOnPaginationChange.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.onCardsPaginationChange = this.onCardsPaginationChange.bind(this);
  }

  handleOnSelectChange({ selectedRowKeys }) {
    this.setState({ selectedRowKeys: [selectedRowKeys] });
  }

  handleOnPaginationChange(currentPage) {
    this.props.fetchPublicGists({per_page: 9,page: currentPage});
  }

  onViewChange(selectedView) {
    console.log(selectedView);
    this.setState({ view: selectedView });
  }

  componentDidMount() {
    this.props.fetchPublicGists({per_page: 9,page: 1});
  }

  onCardsPaginationChange(currentPage) {
    this.props.fetchPublicGists({per_page: 9,page: currentPage});
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
              onPaginationChange={this.handleOnPaginationChange}
              dataSource={this.props.gists}
              loading={this.props.error || this.props.status!=='succeeded'}
              selectedRowKeys={this.state.selectedRowKeys}
            />
          ) : (
            <CardViewLayout>
              <CardsLayout>
                {this.props.gists.map((gist, index) => (
                  // <UserCard style={{ width: "40%" }}>
                  //   <GistPreview gist={gist.gist} key={index} />
                  // </UserCard>
                  <Card style={{"maxWidth":"100%", "width":"100%", "maxHeight":"100%", "height":"100%", "overflow":"hidden", "padding":"0"}}>
                    <GistPreview gist={gist.gist} key={index} />
                  </Card>
                ))}
              </CardsLayout>
              <Pagination
                defaultCurrent={1}
                total={50}
                onChange={this.onCardsPaginationChange}
              />
            </CardViewLayout>
          )}
        </div>
      </HomePageLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gists: selectAllGists(state),
    status: selectGistsStatus(state),
    error: selectGistsError(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPublicGists: ({ per_page, page }) => {
      dispatch(fetchPublicGists({ per_page, page }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
