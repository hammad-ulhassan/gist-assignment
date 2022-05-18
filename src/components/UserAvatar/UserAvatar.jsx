import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from '@ant-design/icons';

export default class UserAvatar extends React.Component{
    render(){
        const {src, size} = this.props;
        return(
            <Avatar src={src} icon={!src?<UserOutlined/>:null} size={size}></Avatar>
        );
    }
}