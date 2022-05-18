import React, { Component } from "react";
import { HomePageLayout, CFSWrapper } from "../../shared/styles";
import { Form, Input, Button } from "antd";
import { RouterComponent } from "../RouterComponent/RouterComponent";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(accessTokenValue) {
    this.props.handleSubmit(accessTokenValue);
    this.props.navigate("/user");
  }

  render() {
    return (
      <HomePageLayout>
        <CFSWrapper>
          <h2>Login</h2>
        </CFSWrapper>
        <div>
          <Form
            name="accesstoken"
            initialValues={{
              token: "",
            }}
            onFinish={this.handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Access Token"
              name="token"
              rules={[
                {
                  required: true,
                  message: "Please input your Personal Access Token!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Github Username!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value === "hammad-ulhassan") {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(`Username must always be 'hammad-ulhassan'`)
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </HomePageLayout>
    );
  }
}

export default RouterComponent(LoginPage);
