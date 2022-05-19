import React from "react";
import { Card } from "antd";
import { getGist } from "../../data/gists";
import CodeView from "../CodeView/CodeView";

export default class GistPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  componentDidMount() {
    const { gist } = this.props;
    getGist(gist)
      .then((gistData) => {
        const content = gistData.files[Object.keys(gistData.files)[0]].content;
        this.setState({content: content})
      })
      .catch((err) => console.log(err));
  }

  render() {
      const {limit} = this.props;
    return (
      <Card
        size="default"
        style={{ minWidth: "100%", margin: "1%" }}
        className="card-style"
      >
        {/* {Object.keys(gist.files).map((filename, index) => (
          <Tag key={index}>{filename}</Tag>
        ))} */}
        <CodeView content={this.state.content} limit={limit}></CodeView>
      </Card>
    );
  }
}
