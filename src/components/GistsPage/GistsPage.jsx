import React from "react";
import { getGist } from "../../data/gists";
import {
  CSBWrapper,
  HomePageLayout,
  ColFSWrapper,
} from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import GistCard from "../GistCard/GistCard";
import { getUserData } from "../../data/users";
import moment from "moment";
import GistUtils from "../GistUtils/GistUtils";
import AvatarWithData from "../AvatarWithData/AvatarWithData";

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
    const loggedIn = localStorage.getItem("logged-in");
    const userData = JSON.parse(localStorage.getItem("user-data"))
    const showPersonalControls = ((this.state.owner?.id === userData.id) && loggedIn);

    return (
      <HomePageLayout>
        <CSBWrapper>
          <AvatarWithData owner={this.state.owner} createdAt={this.state.created_at} userName={this.state.userName} avatarSize={64}/>
          <GistUtils forks={this.state.forks} showPersonalControls={showPersonalControls}/>
          
        </CSBWrapper>
        <ColFSWrapper gap="0.5vh">
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
        </ColFSWrapper>
      </HomePageLayout>
    );
  }
}
export default RouterComponent(GistsPage);
