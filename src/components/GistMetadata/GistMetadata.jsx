import React, { Component } from "react";
import { Typography } from "antd";
import { RowFS, ColC } from "./styles";
import UserAvatar from "../UserAvatar/UserAvatar";
import { GistDetails, StyledLink } from "../../shared/styles";
import { Link } from "react-router-dom";
import moment from "moment";

const { Text } = Typography;

export default class GistMetadata extends Component {
  render() {
    const { isInTable, gist } = this.props;
    //extract fist filename to show at file name.
    return (
      <RowFS>
        <UserAvatar src={gist?.owner?.avatar_url} size={64} />
        {!isInTable ? (
          <GistDetails>
            <span>
              <StyledLink to="/user">
                {`@${gist?.owner?.login}/`}
              </StyledLink>{" "}
              <Link to="/gist" state={gist}>
                {gist?.files[Object.keys(gist.files)[0]].filename}
              </Link>
            </span>
            <Text type="secondary">{moment(gist?.created_at).fromNow()}</Text>
            <Text type="secondary">{gist?.description?.slice(0,20)}</Text>
          </GistDetails>
        ) : (
          <ColC>
            <Text>{gist?.owner?.login}</Text>
          </ColC>
        )}
      </RowFS>
    );
  }
}
