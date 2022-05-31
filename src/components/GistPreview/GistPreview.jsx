import React from "react";
import { getGist } from "../../data/gists";
import { GistContainer} from "./styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import CodeView from "../CodeView/CodeView";
import GistMetadata from "../GistMetadata/GistMetadata";
import { fetchSelectedGistData, selectedGist } from "../../redux/gistSlice";
import { connect } from "react-redux";


class GistPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: null,
      content: null,
      language: null,
      loaded: false,
    };
    this.navigateToGist = this.navigateToGist.bind(this);
  }
  componentDidMount() {
    const { gist } = this.props;
    this.fetchGistData(gist);
  }

  fetchGistData(gist){
    const firstFile = gist?.files[Object.keys(gist.files)[0]];
    getGist(gist)
      .then((gistData) => {
        this.setState({
          file: firstFile,
          content: gistData.files[Object.keys(gistData.files)[0]].content,
          language: gistData.files[Object.keys(gistData.files)[0]].language,
          loaded: true,
        });
      })
      .catch((err) => console.log(err));
  }

  navigateToGist() {
    const { gist } = this.props;
    this.props.setSelectedGist({gist});
    this.props.fetchSelectedGistAllData();
    this.props.navigate(`/gist/${gist.id}`);
  }

  render() {
    const { gist } = this.props;

    return (
      <GistContainer>
        <GistMetadata isInTable={false} gist={gist}/>
        <CodeView
          loaded={this.state.loaded}
          content={this.state.content?.split("\n").slice(0, 10).join("\n")}
          navigateToGist={this.navigateToGist}
          language={this.state.language}
        />
      </GistContainer>
    );
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.gist.id !== this.props.gist.id){
      this.fetchGistData(this.props.gist)
    }

  }

}

function mapDispatchToProps(dispatch){
  return {
    setSelectedGist: ({gist}) => {
      dispatch(selectedGist(gist));
    },
    fetchSelectedGistAllData: () =>{
      dispatch(fetchSelectedGistData())
    }
  };
}
export default RouterComponent(connect(null, mapDispatchToProps)(GistPreview));
