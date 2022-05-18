import React from "react";
import { CFSWrapper, HomePageLayout } from "../../shared/styles";
import { notification } from "antd";
import { createGist, getGist, updateGist } from "../../data/gists";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import GistForm from "../GistForm/GistForm";

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

    if (!this.isUpdate) {
      createGist(gistPostData).then((e) =>
        notification.open({
          message: "Gist Created",
        })
      );
    } else {
      updateGist(this.gistId, gistPostData).then((e) =>
        notification.open({ message: "Gist Edited" })
      );
    }
    this.props.navigate("/user");
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      this.isUpdate = true;
      this.gistId = state.id;
      console.log(state);
      getGist(state)
        .then((gistData) => {
          var transformed = { description: null, files: [] };
          transformed.description = gistData.description;
          Object.keys(gistData.files).forEach((file) =>
            transformed.files.push({
              filename: file,
              content: gistData.files[file].content,
            })
          );
          console.log(this.state, this.formRef);
          this.formRef.current.resetFields();
          this.setState(transformed, () => console.log(this.state));
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    console.log("rendering");
    return (
      <HomePageLayout>
        <CFSWrapper>
          <h2>Create Gist</h2>
        </CFSWrapper>
        <GistForm
          onHanldeSubmitForm={this.onCreateGist}
          formRef={this.formRef}
          files={this.state.files}
          description={this.state.description}
        />
      </HomePageLayout>
    );
  }
}

export default RouterComponent(CreateGistPage);
