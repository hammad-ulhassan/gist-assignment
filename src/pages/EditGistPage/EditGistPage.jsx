import React from "react";
import { CFSWrapper, HomePageLayout } from "../../shared/styles";
import GistForm from "../../components/GistForm/GistForm";
import { RouterComponent } from "../../components/RouterComponent/RouterComponent";
import {
  selectedGistAllData,
  selectAllDataStatus,
  editGist,
} from "../../redux/gistSlice";
import { connect } from "react-redux";

class EditGistPage extends React.Component {
  constructor(props) {
    super(props);
    this.onEditGist = this.onEditGist.bind(this);
    this.state = {
        description: null,
        files: [],
      };
    this.formRef = React.createRef();
  }

  onEditGist(values) {
    let fileContentMap = new Map();
    values.files.forEach((file) =>
      fileContentMap.set(file.filename, { content: file.content })
    );
    const gistPostData = {
      description: values.description,
      public: true,
      files: Object.fromEntries(fileContentMap),
    };
    this.props.editGist(gistPostData);

    this.props.navigate("/home");
  }

  componentDidMount() {
    const { selectedGistAllData } = this.props;
    var transformed = { description: null, files: [] };
    transformed.description = selectedGistAllData.description;
    Object.keys(selectedGistAllData.files).forEach((file) =>
      transformed.files.push({
        filename: file,
        content: selectedGistAllData.files[file].content,
      })
    );
    this.setState({description: transformed.description, files: transformed.files}, ()=>{
        this.formRef.current.resetFields();
    });

  }

  render() {
    return (
      <HomePageLayout>
        <CFSWrapper>
          <h2>Edit Gist</h2>
        </CFSWrapper>
        <GistForm
          onHanldeSubmitForm={this.onEditGist}
          formRef={this.formRef}
          files={this.state.files}
          description={this.state.description}
        />
      </HomePageLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedGistAllData: selectedGistAllData(state),
    gistAllDataStatus: selectAllDataStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editGist: (gistPostData) => {
      dispatch(editGist(gistPostData));
    },
  };
};

export default RouterComponent(connect(mapStateToProps, mapDispatchToProps)(EditGistPage));
