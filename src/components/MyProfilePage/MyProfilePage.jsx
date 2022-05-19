import { Button, Card, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { CFEWrapper, ColFSWrapper, HomePageLayout, UserProfileWrapper } from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import UserAvatar from "../UserAvatar/UserAvatar";
import { PlusOutlined } from "@ant-design/icons";


class MyProfilePage extends React.Component {
  render() {
    return (
      <HomePageLayout>
          
        <CFEWrapper>
          <Button icon={<PlusOutlined />} onClick={this.handleCreateGist}>
            Create Gist
          </Button>
        </CFEWrapper>
        <UserProfileWrapper>
          <ColFSWrapper>
            <UserAvatar size={256} src={this.state.userData?.avatar_url} />
            {/* <h2>{userData.name}</h2> */}
            {/* <h4>{userData.bio}</h4> */}
            <Button>GitHub Profile</Button>
          </ColFSWrapper>
          <ColFSWrapper>
            {this.state.loaded &&
              this.state.gists.map((gist, index) => (
                <Link
                  to="/create"
                  style={{ minWidth: "100%", margin: "1%" }}
                  state={gist}
                  key={index}
                >
                  <Card
                    title={gist.description}
                    size="default"
                    style={{ minWidth: "100%", margin: "1%" }}
                    hoverable
                  >
                    {Object.keys(gist.files).map((filename, index) => (
                      <Tag key={index}>{filename}</Tag>
                    ))}
                  </Card>
                </Link>
              ))}
          </ColFSWrapper>
        </UserProfileWrapper>
      </HomePageLayout>
    );
  }
}

export default RouterComponent(MyProfilePage);
