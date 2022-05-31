import React, { Component } from "react";
import { Typography } from "antd";
import { RowFS, ColC } from "./styles";
import UserAvatar from "../UserAvatar/UserAvatar";
import { GistDetails, StyledAnchor, PaddedAnchor } from "../../shared/styles";
import moment from "moment";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import { fetchSelectedGistData, selectedGist } from "../../redux/gistSlice";
import { connect } from "react-redux";

const { Text } = Typography;

class GistMetadata extends Component {
  constructor(props){
    super(props);
    this.userNavigate = this.userNavigate.bind(this);
    this.gistNavigate = this.gistNavigate.bind(this);
  }

  userNavigate(){
    const { gist } = this.props;
    this.props.setSelectedGist({gist});
    this.props.navigate(`/user/${gist?.owner?.login}`);
  }

  gistNavigate(){
    const { gist } = this.props;

    this.props.navigate(`/gist/${gist?.id}`)
  }


  render() {
    const { isInTable, gist } = this.props;
    //extract fist filename to show at file name.
    return (
      <RowFS>
        <UserAvatar src={gist?.owner?.avatar_url} size={64} />
        {!isInTable ? (
          <GistDetails>
            <span>
              <StyledAnchor onClick={this.userNavigate}>
                {`@${gist?.owner?.login}/`}
              </StyledAnchor>
              <PaddedAnchor onClick={this.gistNavigate}>
                {gist?.files[Object.keys(gist.files)[0]].filename}
              </PaddedAnchor>
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
  connect(null, mapDispatchToProps)(GistMetadata)
)
