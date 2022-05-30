import React from "react";
import { Spin } from "antd";
import { CodeBlock } from "./styles";
import SyntaxHighlighter from "react-syntax-highlighter";

export default class CodeView extends React.Component {
  render() {
    const { content, loaded, language } = this.props;
    return (
      <CodeBlock onClick={this.props.navigateToGist}>
        {loaded ? (
          <SyntaxHighlighter
            showLineNumbers={true}
            lineNumberStyle={{ color: "var(--gray)" }}
            language={language}
            style={{ fontSize: "0.3rem" }}
          >
            {content}
          </SyntaxHighlighter>
        ) : (
          <Spin size="small" />
        )}
      </CodeBlock>
    );
  }
}
