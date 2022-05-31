import React from "react";
import {
  CFSWrapper,
  HomePageLayout,
  UserProfileWrapper,
  UserProfileGistsList,
  FCFCWrapper,
  TextWordBreak,
} from "../../shared/styles";
import { RouterComponent } from "../../components/RouterComponent/RouterComponent";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { Button, Typography } from "antd";
import GistPreview from "../../components/GistPreview/GistPreview";
import "./UserProfilePage.css";
import { connect } from "react-redux";
import {
  selectAuthUserData,
  selectIsLoggedIn,
} from "../../redux/credentialSlice";
import {
  fetchUserData,
  fetchUserGists,
  selectUserData,
  selectUserDataStatus,
  selectUserGistsStatus,
  selectUserGists,
} from "../../redux/userSlice";

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, gists: [], userData: null };
  }

  componentDidMount() {
    this.props.fetchUserData();
    this.props.fetchUserGists();
  }

  render() {
    const { selectedUserData, selectUserGistsStatus, selectUserGists } = this.props;

    return (
      <HomePageLayout>
        <CFSWrapper>
          <h2>User Gists</h2>
        </CFSWrapper>
        <UserProfileWrapper>
          <FCFCWrapper>
            <UserAvatar size={200} src={selectedUserData?.avatar_url} />
            <TextWordBreak>
              <Typography.Title level={4}>
                {selectedUserData?.name}
              </Typography.Title>
            </TextWordBreak>
            <TextWordBreak>
              <Typography.Title level={5}>
                {selectedUserData?.bio}
              </Typography.Title>
            </TextWordBreak>
            <Button>GitHub Profile</Button>
          </FCFCWrapper>
          <UserProfileGistsList>
            {selectUserGistsStatus === "succeeded" &&
              selectUserGists.map((gist, index) => (
                <GistPreview gist={gist} key={index} />
              ))}
          </UserProfileGistsList>
        </UserProfileWrapper>
      </HomePageLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectIsLoggedIn(state),
    authUserData: selectAuthUserData(state),
    selectedUserData: selectUserData(state),
    selectedUserDataStatus: selectUserDataStatus(state),
    selectUserGistsStatus: selectUserGistsStatus(state),
    selectUserGists: selectUserGists(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => {
      dispatch(fetchUserData());
    },
    fetchUserGists: () => {
      dispatch(fetchUserGists());
    },
  };
};

export default RouterComponent(
  connect(mapStateToProps, mapDispatchToProps)(UserProfilePage)
);
