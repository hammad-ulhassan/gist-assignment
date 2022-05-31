import React from "react";
import { Button, notification, Table, Tag } from "antd";
import { StarOutlined, ForkOutlined } from "@ant-design/icons";
import "./DataTable.css";
import { CSAWrapper } from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import GistMetadata from "../GistMetadata/GistMetadata";
import { connect } from "react-redux";
import { selectedGist, fetchSelectedGistData } from "../../redux/gistSlice";
import { selectIsLoggedIn } from "../../redux/credentialSlice";
import { forkGist, starGist } from "../../data/gists";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.starGist = this.starGist.bind(this);
    this.forkGist = this.forkGist.bind(this);
    this.state = {
      loggedIn: false,
    };
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.handleOnSelectChange({ selectedRowKeys });
  };

  onPaginationChange(currentPageNumber) {
    this.props.onPaginationChange(currentPageNumber);
  }

  forkGist(gistId) {
    forkGist(gistId).then((res) => {
      if (res.status === 201) {
        notification.open({
          message: "Gist Starred",
        });
      }
    });
  }

  starGist(gistId) {
    starGist(gistId).then((res) => {
      if (res.status === 204) {
        notification.open({
          message: "Gist Starred",
        });
      }
    });
  }

  render() {
    const { loading, selectedRowKeys, dataSource } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        render: (text, record, index) => (
          <GistMetadata isInTable={true} gist={record.gist} />
        ),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "12%",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        width: "8%",
      },
      {
        title: "Keyword",
        dataIndex: "keyword",
        key: "keyword",
        width: "16%",
        render: (text, record, index) => text && text.slice(0, 25) + "...",
      },
      {
        title: "Notebook Name",
        dataIndex: "notebook",
        key: "notebook",
        width: "32%",
        render: (text, record, index) =>
          record.notebook.map((file, index) =>
            index < 5 ? <Tag key={index}>{file}</Tag> : null
          ),
      },
      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        width: "8%",
        render: (text, record, index) => {
          return this.state.loggedIn ? (
            <CSAWrapper gap={3}>
              <Button
                type="text"
                icon={<StarOutlined />}
                onClick={(e) => {
                  this.starGist(record.gist.id);
                  e.stopPropagation();
                }}
              />
              <Button
                type="text"
                icon={<ForkOutlined />}
                onClick={(e) => {
                  this.forkGist(record.gist.id);
                  e.stopPropagation();
                }}
              />
            </CSAWrapper>
          ) : null;
        },
      },
    ];
    return (
      <>
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={dataSource}
          scroll={{ y: 600 }}
          loading={loading}
          pageSize={10}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            total: 1000,
            onChange: this.onPaginationChange,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                this.props.setSelectedGist(record);
                this.props.fetchSelectedGistAllData();
                this.props.navigate(`/gist/${record.gist.id}`);
              },
            };
          }}
        />
      </>
    );
  }

  componentDidUpdate(previousProps, previousState) {
    if(previousState.loggedIn !== this.props.isLoggedIn){
      this.setState({loggedIn: this.props.isLoggedIn})
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectIsLoggedIn(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setSelectedGist: ({ gist }) => {
      dispatch(selectedGist(gist));
    },
    fetchSelectedGistAllData: () => {
      dispatch(fetchSelectedGistData());
    },
  };
}

export default RouterComponent(
  connect(mapStateToProps, mapDispatchToProps)(DataTable)
);
