import { Button, Typography } from "antd";
import React from "react";
import {
  HomePageLayout,
  UserProfileWrapper,
  CFSWrapper,
  FCFCWrapper,
  TextWordBreak,
  UserProfileGistsList,
} from "../../shared/styles";
import { RouterComponent } from "../../components/RouterComponent/RouterComponent";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import GistPreview from "../../components/GistPreview/GistPreview";
import { selectMyGists, selectMyGistsStatus } from "../../redux/userSlice";
import { connect } from "react-redux";
import { selectAuthUserData } from "../../redux/credentialSlice";



class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateGist = this.handleCreateGist.bind(this);
  }

  handleCreateGist() {
    this.props.navigate("/create");
  }

  componentDidMount() {
  }

  render() {
    return (
      <HomePageLayout>
        <CFSWrapper>
          <Button onClick={this.handleCreateGist}>Create Gist</Button>
        </CFSWrapper>
        <UserProfileWrapper>
          <FCFCWrapper>
            <UserAvatar size={200} src={this.props.myData?.avatar_url} />
            <TextWordBreak>
              <Typography.Title level={4}>
                {this.props.myData?.name}
              </Typography.Title>
            </TextWordBreak>
            <TextWordBreak>
              <Typography.Title level={5}>
                {this.props.myData?.bio}
              </Typography.Title>
            </TextWordBreak>
            <Button>GitHub Profile</Button>
          </FCFCWrapper>
          <UserProfileGistsList>
            {this.props.myGistsStatus==='succeeded' &&
              this.props.myGists?.map((gist, index) => (
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
    myGists: selectMyGists(state),
    myGistsStatus: selectMyGistsStatus(state),
    myData: selectAuthUserData(state)
  };
};

export default RouterComponent(connect(mapStateToProps, null)(MyProfilePage));
