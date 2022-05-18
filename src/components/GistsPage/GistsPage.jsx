import React from "react";
import { getGist } from "../../data/gists";
import {
  CSBWrapper,
  HomePageLayout,
  ColSAWrapper,
  NumberDisplay,
  TextLine,
} from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import GistCard from "../GistCard/GistCard";
import { Avatar } from "antd";
import { UserOutlined, StarOutlined, ForkOutlined } from "@ant-design/icons";
import { getUserData } from "../../data/users";
import moment from "moment";

class GistsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: null,
      forks: [],
      files: {},
      description: null,
      created_at: null,
      updated_at: null,
      userName: null,
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    getGist(state)
      .then((gistData) => {
        this.setState({
          files: gistData.files,
          owner: gistData.owner,
          forks: gistData.forks,
          description: gistData.description,
          created_at: moment(gistData.created_at).format("DD-MM-YYYY"),
          updated_at: gistData.updated_at,
        });
        return gistData;
      })
      .then((gistData) => {
        return getUserData(gistData.owner.url);
      })
      .then((userData) => this.setState({ userName: userData.name }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <HomePageLayout>
        <CSBWrapper>
          {/* {this.state.owner?<UserData isInTable={false} record={this.state.owner}/>:<></>} */}
          <CSBWrapper gap={1}>
            <Avatar
              src={this.state?.owner?.avatar_url}
              size={64}
              icon={<UserOutlined />}
            ></Avatar>
            <ColSAWrapper>
              <TextLine>{this.state.userName}</TextLine>
              <TextLine>{this.state.created_at}</TextLine>
            </ColSAWrapper>
          </CSBWrapper>
          <CSBWrapper gap={3}>
            <div style={{"margin": "0 1rem"}}>
              <CSBWrapper>
                <StarOutlined />
                <TextLine>Star</TextLine>
                <NumberDisplay>0</NumberDisplay>
              </CSBWrapper>
            </div>
            <div>
              <CSBWrapper>
                <ForkOutlined />
                <TextLine>Fork</TextLine>
                <NumberDisplay>{this.state.forks.length}</NumberDisplay>
              </CSBWrapper>
            </div>
          </CSBWrapper>
        </CSBWrapper>
        <ColSAWrapper gap="0.5vh">
          {Object.keys(this.state.files)
            .map((fn) => this.state.files[fn])
            .map((file, index) => (
              <GistCard
                style={{ minWidth: "100%", margin: "1%" }}
                filename={file.filename}
                content={file.content}
                key={index}
              />
            ))}
        </ColSAWrapper>
      </HomePageLayout>
    );
  }
}
export default RouterComponent(GistsPage);
