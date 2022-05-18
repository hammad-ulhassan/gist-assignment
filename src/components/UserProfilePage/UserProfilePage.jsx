import React from "react";
import { getGistsForAuthenticatedUser } from "../../data/gists";
import {
  ColSAWrapper,
  CSBWrapper,
  HomePageLayout,
  UserProfileWrapper,
} from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Button, Card, Tag } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";


class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, gists: [] };
    this.handleCreateGist = this.handleCreateGist.bind(this);
  }

  handleCreateGist(){
    this.props.navigate('/create');
  }

  componentDidMount() {
    getGistsForAuthenticatedUser().then((gists) =>
      this.setState({ loaded: true, gists })
    );
  }

  render() {
    const userData = JSON.parse(localStorage.getItem('user-data'));

    return (
      <HomePageLayout>
        <CSBWrapper>
          <h2>{userData.name}</h2>
          <Button icon={<PlusOutlined />} onClick={this.handleCreateGist}>
            Create Gist
          </Button>
        </CSBWrapper>
        <UserProfileWrapper>
          <ColSAWrapper>
            <UserAvatar size={256} src={userData?.avatar_url}/>
            <h2>{userData.name}</h2>
            <h4>{userData.bio}</h4>
            <Button>GitHub Profile</Button>
          </ColSAWrapper>
          <ColSAWrapper>
            {this.state.loaded &&
              this.state.gists.map((gist, index) => (
                <Link to="/create" style={{ minWidth: "100%", margin: "1%" }} state={gist} key={index}>
                  <Card
                    title={gist.description}
                    size="default"
                    style={{ minWidth: "100%", margin: "1%" }}
                    hoverable
                  >
                    {Object.keys(gist.files).map((filename , index) => (
                      <Tag key={index}>{filename}</Tag>
                    ))}
                  </Card>
                </Link>
              ))}
          </ColSAWrapper>
        </UserProfileWrapper>
      </HomePageLayout>
    );
  }
}

export default RouterComponent(UserProfilePage);
