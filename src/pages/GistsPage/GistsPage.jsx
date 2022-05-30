import React from "react";
import { forkGist, starGist } from "../../data/gists";
import { CSBWrapper, HomePageLayout, ColFSWrapper } from "../../shared/styles";
import { Spin } from "antd";
import { RouterComponent } from "../../components/RouterComponent/RouterComponent";
import GistUtils from "../../components/GistUtils/GistUtils";
import GistMetadata from "../../components/GistMetadata/GistMetadata";
import GistCard from "../../components/GistCard/GistCard";
import {
  selectAuthUserData,
  selectIsLoggedIn,
} from "../../redux/credentialSlice";
import {
  selectedGistAllData,
  selectAllDataStatus,
  deleteGist,
  selectGistDeleteStatus,
} from "../../redux/gistSlice";
import { connect } from "react-redux";

class GistsPage extends React.Component {
  constructor(props) {
    super(props);
    this.editGist = this.editGist.bind(this);
    this.deleteGist = this.deleteGist.bind(this);
    this.forkGist = this.forkGist.bind(this);
    this.starGist = this.starGist.bind(this);
    this.loaded = false;
  }

  editGist() {
    this.props.navigate("/edit");
  }

  deleteGist() {
    // deleteGist(this.props.selectedGistAllData?.id).then((res) => {
    //   if (res.status === 204) {
    //     this.props.navigate("/home");
    //   }
    // });
    this.props.deleteGist();
    if(this.props.gistDeleteStatus==='succeeded'){
      this.props.navigate("/home");
    }
  }

  forkGist() {
    forkGist(this.props.selectedGistAllData?.id).then((res) => {
      if (res.status === 201) {
        // this.getGistSetState(this.state.gist);
      }
    });
  }

  starGist() {
    starGist(this.props.selectedGistAllData?.id).then((res) => {
      if (res.status === 204) {
        // this.getGistSetState(this.state.gist);
      }
    });
  }

  render() {
    var showPersonalControls = false;

    if (this.props.isLoggedIn === true) {
      if (
        this.props.authUserData?.id ===
        this.props.selectedGistAllData?.owner?.id
      ) {
        showPersonalControls = true;
      }
    }

    var loaded = this.props.gistAllDataStatus === "succeeded";

    return (
      <HomePageLayout>
        <CSBWrapper>
          {loaded ? (
            <GistMetadata
              isInTable={false}
              gist={this.props.selectedGistAllData}
            />
          ) : null}
          {loaded ? (
            <GistUtils
              forks={this.props.selectedGistAllData?.forks}
              showPersonalControls={showPersonalControls}
              handleGistEdit={this.editGist}
              handleGistDelete={this.deleteGist}
              handleForkGist={this.forkGist}
              handleGistStar={this.starGist}
            />
          ) : null}
        </CSBWrapper>
        <ColFSWrapper gap="0.5vh">
          {loaded ? (
            Object.keys(this.props.selectedGistAllData?.files)
              .map((fn) => this.props.selectedGistAllData?.files[fn])
              .map((file, index) => (
                <GistCard
                  style={{ minWidth: "100%", margin: "1%" }}
                  filename={file.filename}
                  content={file.content}
                  language={file.language}
                  key={index}
                />
              ))
          ) : (
            <Spin size="large" />
          )}
        </ColFSWrapper>
      </HomePageLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectIsLoggedIn(state),
    authUserData: selectAuthUserData(state),
    selectedGistAllData: selectedGistAllData(state),
    gistAllDataStatus: selectAllDataStatus(state),
    gistDeleteStatus: selectGistDeleteStatus(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGist: ()=>{
      dispatch(deleteGist())
    }
  }
}
export default RouterComponent(connect(mapStateToProps, mapDispatchToProps)(GistsPage));