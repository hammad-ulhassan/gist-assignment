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
  render() {
    const { forks, showPersonalControls } = this.props;
    return (
      <CSBWrapper>
        {showPersonalControls?
          <>
            <CSBWrapper>
              <Button type="link" icon={<EditOutlined />}>
                Edit
              </Button>
            </CSBWrapper>
            <CSBWrapper>
              <Button type="link" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </CSBWrapper>
          </>:null
        }
        <CSBWrapper>
          <Button type="link" icon={<StarOutlined />}>
            Star
          </Button>
          <NumberDisplay>0</NumberDisplay>
        </CSBWrapper>
        <CSBWrapper>
          <Button type="link" icon={<ForkOutlined />}>
            Fork
          </Button>
          <NumberDisplay>{forks.length}</NumberDisplay>
        </CSBWrapper>
      </CSBWrapper>
    );
  }
}
