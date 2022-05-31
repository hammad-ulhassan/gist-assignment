import React from "react";
import { CFSWrapper, HomePageLayout } from "../../shared/styles";
import { notification } from "antd";
import GistForm from "../../components/GistForm/GistForm";
import { RouterComponent } from "../../components/RouterComponent/RouterComponent";
import { createGist, selectGistCreatedStatus } from "../../redux/gistSlice";
import { connect } from "react-redux";
import { fetchMyGists } from "../../redux/userSlice";

class CreateGistPage extends React.Component {
  constructor(props) {
    super(props);
    this.onCreateGist = this.onCreateGist.bind(this);
    this.state = {
      description: null,
      files: [],
    };
    this.formRef = React.createRef();
    this.isUpdate = false;
    this.gistId = null;
  }

  onCreateGist(values) {
    console.log(values);
    let fileContentMap = new Map();
    values.files.forEach((file) =>
      fileContentMap.set(file.filename, { content: file.content })
    );
    const gistPostData = {
      description: values.description,
      public: true,
      files: Object.fromEntries(fileContentMap),
    };
    this.props.createGist(gistPostData);
    // createGist(gistPostData).then((e) =>
    //   notification.open({
    //     message: "Gist Created",
    //   })
    // );
    this.props.fetchAuthUserGists();
    this.props.navigate("/me");
  }

  componentDidMount() {}

  render() {
    return (
      <HomePageLayout>
        <CFSWrapper>
          <h2>Create Gist</h2>
        </CFSWrapper>
        <GistForm
          onHanldeSubmitForm={this.onCreateGist}
          // formRef={this.formRef}
          // files={this.state.files}
          // description={this.state.description}
        />
      </HomePageLayout>
    );
  }

  componentDidUpdate() {
    if (this.props.gistCreatedStatus === "succeeded") {
      notification.open({
        message: "Gist Created",
      });
    }
    else{
      notification.open({
        message: "Some Error Occured",
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    gistCreatedStatus: selectGistCreatedStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGist: (gistPostData) => {
      dispatch(createGist(gistPostData));
    },
    fetchAuthUserGists:()=>{
      dispatch(fetchMyGists())
    }
  };
};

export default RouterComponent(
  connect(mapStateToProps, mapDispatchToProps)(CreateGistPage)
);
