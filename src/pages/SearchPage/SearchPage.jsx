import React from "react";
import { RouterComponent } from "../../components/RouterComponent/RouterComponent";
import {
  UserCard,
  HomePageLayout,
  CFEWrapper,
  CardsLayout,
} from "../../shared/styles";
import { Pagination } from "antd";
import BtnGrp from "../../components/BtnGrp/BtnGrp";
import GistPreview from "../../components/GistPreview/GistPreview";
import DataTable from "../../components/DataTable/DataTable";
import { connect } from "react-redux";
import { selectSearchResults } from "../../redux/searchSlice";


class SearchPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedRowKeys: [],
      loading: false,
      view: "table",
    };
  }

  handleOnSelectChange({ selectedRowKeys }) {
    this.setState({ selectedRowKeys: [selectedRowKeys] });
  }

  handleOnPaginationChange(currentPage) {
    //   this.getGistsForUser(); 
  }

  render() {
    const {searchResults} = this.props;
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
              dataSource={searchResults}
              loading={this.state.loading}
              selectedRowKeys={this.state.selectedRowKeys}
            />
          ) : (
            <>
              <CardsLayout>
                {this.state.tableData.map((gist, index) => (
                  <UserCard style={{ maxWidth: "25rem" }}>
                    <GistPreview gist={gist.gist} key={index} />
                  </UserCard>
                ))}
              </CardsLayout>
              <Pagination
                defaultCurrent={1}
                total={50}
                onChange={this.onCardsPaginationChange}
              />
            </>
          )}
        </div>
      </HomePageLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: selectSearchResults(state),
  };
};


export default RouterComponent(connect(mapStateToProps, null)(SearchPage));
