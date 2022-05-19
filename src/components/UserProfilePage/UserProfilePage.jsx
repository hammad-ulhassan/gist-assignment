import React from "react";
import { getGistsForUser } from "../../data/gists";
import { getUserData } from "../../data/users";
import {
  CFSWrapper,
  ColFSWrapper,
  HomePageLayout,
  UserProfileWrapper,
} from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Button } from "antd";
import AvatarWithData from "../AvatarWithData/AvatarWithData";
import GistPreview from "../GistPreview/GistPreview";
import moment from "moment";
import { Link } from "react-router-dom";

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, gists: [], userData: null };
    this.handleCreateGist = this.handleCreateGist.bind(this);
  }

  handleCreateGist() {
    this.props.navigate("/create");
  }

  componentDidMount() {
    const { state: userData } = this.props.location;
    getGistsForUser(userData)
      .then((gists) => {
        this.setState({ loaded: true, gists });
        return userData;
      })
      .then((userData) => getUserData(userData.url))
      .then((userData) => {
        this.setState({ userData });
      });
  }

  render() {
    return (
      <HomePageLayout>
        <CFSWrapper>
          <h3>User Gists</h3>
        </CFSWrapper>
        <UserProfileWrapper>
          <ColFSWrapper>
            <UserAvatar size={256} src={this.state.userData?.avatar_url} />
            <span style={{"whiteSpace":"break-spaces", "padding":"0, 5rem"}}>
              <h2>{this.state.userData?.name}</h2>
            </span>
            <span style={{"whiteSpace":"break-spaces", "padding":"0, 5rem"}}>
              <h4>{this.state.userData?.bio}</h4>
            </span>
            <Button>GitHub Profile</Button>
          </ColFSWrapper>
          <ColFSWrapper>
            {this.state.loaded &&
              this.state.gists.map((gist, index) => (
                <React.Fragment key={index}>
                  <AvatarWithData
                    owner={this.state.userData}
                    userName={this.state.userData?.login}
                    createdAt={moment(gist.created_at).format('DD-MM-YYYY')}
                    avatarSize={32}
                    key={gist.created_at}
                  />
                  <Link to="/gist" state={gist}>
                    <GistPreview gist={gist} limit={true} key={gist.id}/>
                  </Link>
                </React.Fragment>
              ))}
          </ColFSWrapper>
        </UserProfileWrapper>
      </HomePageLayout>
    );
  }
}

export default RouterComponent(UserProfilePage);
