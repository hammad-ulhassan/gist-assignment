import React from "react";
import { Radio } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';

export default class BtnGrp extends React.Component{
    constructor(props){
        super(props);
        this.viewChange = this.viewChange.bind(this);
    }

    viewChange(e){
      this.props.onViewChange(e.target.value)
    }

    render(){
        return (
          <Radio.Group value={this.props.view} onChange={this.viewChange} buttonStyle="outline">
            <Radio.Button value="table" type="text">
              <UnorderedListOutlined />
            </Radio.Button>
            <Radio.Button value="card" type="text">
              <AppstoreOutlined />
            </Radio.Button>
          </Radio.Group>
        );
    }
}