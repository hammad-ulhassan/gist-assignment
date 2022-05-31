import React from "react";
import { CSBWrapper, NumberDisplay } from "../../shared/styles";
import {
  StarOutlined,
  ForkOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

export default class GistUtils extends React.Component {
  constructor(props) {
    super(props);
    this.handleGistEdit = this.handleGistEdit.bind(this);
    this.handleGistDelete = this.handleGistDelete.bind(this);
    this.handleForkGist = this.handleForkGist.bind(this);
    this.handleGistStar = this.handleGistStar.bind(this);
  }

  handleGistEdit() {
    this.props.handleGistEdit();
  }

  handleGistDelete() {
    this.props.handleGistDelete();
  }

  handleForkGist() {
    this.props.handleForkGist();
  }

  handleGistStar() {
    this.props.handleGistStar();
  }

  render() {
    const { forks, showPersonalControls, isLoggedIn } = this.props;
    return (
      <CSBWrapper>
        {showPersonalControls ? (
          <>
            <CSBWrapper>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={this.handleGistEdit}
              >
                Edit
              </Button>
            </CSBWrapper>
            <CSBWrapper>
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={this.handleGistDelete}
              >
                Delete
              </Button>
            </CSBWrapper>
          </>
        ) : null}
        {isLoggedIn ? (
          <>
            <CSBWrapper>
              <Button
                type="link"
                icon={<StarOutlined />}
                onClick={this.handleGistStar}
              >
                Star
              </Button>
              <NumberDisplay>0</NumberDisplay>
            </CSBWrapper>
            <CSBWrapper>
              <Button
                type="link"
                icon={<ForkOutlined />}
                onClick={this.handleForkGist}
              >
                Fork
              </Button>
              <NumberDisplay>{forks.length}</NumberDisplay>
            </CSBWrapper>
          </>
        ) : null}
      </CSBWrapper>
    );
  }
}
