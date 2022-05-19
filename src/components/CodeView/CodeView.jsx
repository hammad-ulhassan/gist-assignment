import React from "react";
import { CodeWrapper, Line } from "../../shared/styles";

export default class CodeView extends React.Component {
  render() {
    const { content, limit } = this.props;
    return (
      <CodeWrapper>
        {content
          .split("\n")
          .map((line, i) =>
            !limit ? (
              <Line key={i}>{line}</Line>
            ) : i < 12 ? (
              <Line key={i}>{line}</Line>
            ) : (
              <></>
            )
          )}
      </CodeWrapper>
    );
  }
}
