import React, { Component, useReducer } from "react";
import { CFSWrapper } from "../../shared/styles";
import { Avatar } from "antd";
import { headers } from "../../data/gists";
import { UserOutlined } from '@ant-design/icons';

export default class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
    };
  }

  componentDidMount() {
    const { isInTable, record } = this.props;
    fetch(record.owner.url, headers)
      .then((res) => res.json())
      .then(res=>{
        return res;
      })
      .then((e) => this.setState({ name: e.name }))
      .catch((err) => console.log(err));
  }

  render() {
    const { isInTable, record } = this.props;
    return (
      <CFSWrapper gap={2}>
        <Avatar src={record?.owner.avatar_url || ""} size={isInTable?40:64} icon={<UserOutlined />}/>
        {this.state.name}
      </CFSWrapper>
    );
  }
}
