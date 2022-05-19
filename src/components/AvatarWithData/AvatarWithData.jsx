import React from "react";
import { Link } from "react-router-dom";
import {
  CSBWrapper,
  ColSAWrapper,
  UserNameText,
  AvatarWrapper,
  CFSWrapper,
  CreatedAtText
} from "../../shared/styles";
import UserAvatar from "../UserAvatar/UserAvatar";

export default class AvatarWithData extends React.Component {
  render() {
    const { owner:userData, userName, createdAt, avatarSize } = this.props;
    return (
      <CSBWrapper gap={"3"} width={"100"}>
        <Link to="/user" state={userData}>
          <AvatarWrapper>
            <UserAvatar src={userData?.avatar_url} size={avatarSize} />
          </AvatarWrapper>
        </Link>

        <ColSAWrapper>
          <CFSWrapper width={"100"}>
            <UserNameText>{userName}</UserNameText>
          </CFSWrapper>
          <CFSWrapper width={"100"}>
            <CreatedAtText>{createdAt}</CreatedAtText>
          </CFSWrapper>
        </ColSAWrapper>
      </CSBWrapper>
    );
  }
}
