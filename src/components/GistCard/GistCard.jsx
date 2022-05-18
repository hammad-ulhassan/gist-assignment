import "./GistCard.css";

import React from "react";
import { Card as AntCard } from "antd";
import { Line } from "../../shared/styles";
import { CodeOutlined } from "@ant-design/icons";

export default class GistCard extends React.Component {
  render() {
    const { filename, content } = this.props;
    return (
      <AntCard
        title={
          <>
            <CodeOutlined /> {filename}
          </>
        }
        className="card-style min"
      >
        {content.split("\n").map((line, i) => (
          <Line key={i}>{line}</Line>
        ))}
      </AntCard>
    );
  }
}
