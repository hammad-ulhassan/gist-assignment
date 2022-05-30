import "./GistCard.css";

import React from "react";
import { Card as AntCard } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import CodeView from "../CodeView/CodeView";

export default class GistCard extends React.Component {
  render() {
    const { filename, content, language } = this.props;

    return (
      <AntCard
        title={
          <>
            <CodeOutlined /> {filename}
          </>
        }
        className="card-style min"
      >
        <CodeView loaded={true} language={language} content={content}></CodeView>
      </AntCard>
    );
  }
}
