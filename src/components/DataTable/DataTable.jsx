import React from "react";
import { Button, Table, Tag } from "antd";
import { StarOutlined, ForkOutlined } from "@ant-design/icons";
import "./DataTable.css";
import UserData from "../UserData/UserData";
import { CSAWrapper, OYAWrapper } from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        render: (text, record, index) => (
          <UserData isInTable={true} record={record} />
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
        render: (text, record, index) => (text && text.slice(0, 25) + "..."),
      },
      {
        title: "Notebook Name",
        dataIndex: "notebook",
        key: "notebook",
        width: "32%",
        render: (text, record, index) => (
          <OYAWrapper>
            {record.notebook.map((file, index) =>
              index < 5 ? <Tag key={index}>{file}</Tag> : null
            )}
          </OYAWrapper>
        ),
      },
      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        width: "8%",
        render: (text, record, index) => (
          <CSAWrapper gap={3}>
            <Button
              type="text"
              icon={<StarOutlined />}
              onClick={(e) => {
                console.log("star pressed");
                e.stopPropagation();
              }}
            />
            <Button type="text" icon={<ForkOutlined />} />
          </CSAWrapper>
        ),
      },
    ];
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onNavigated = this.onNavigated.bind(this);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    this.props.handleOnSelectChange({ selectedRowKeys });
  };

  onPaginationChange(currentPageNumber) {
    console.log(currentPageNumber)
    this.props.onPaginationChange(currentPageNumber);
  }

  onNavigated(record){
    this.props.onNavigated(record);
  }

  render() {
    const { loading, selectedRowKeys, dataSource } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <>
      <Table
        columns={this.columns}
        rowSelection={rowSelection}
        dataSource={dataSource}
        scroll={{ y: 600 }}
        loading={loading}
        pageSize
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          total: 1000,
          onChange: this.onPaginationChange,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => this.props.navigate('/gist', {state: record})
          };
        }}
      /></>
    );
  }
}

export default RouterComponent(DataTable)
