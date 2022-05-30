import React, { Component } from "react";
import { HomePageLayout, CFSWrapper } from "../../shared/styles";
import { Form, Input, Button } from "antd";
import { RouterComponent } from "../../components/RouterComponent/RouterComponent";
import { logMeIn, fetchAuthUserData } from "../../redux/credentialSlice";
import { connect } from "react-redux";
import { fetchMyGists } from "../../redux/userSlice";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    // this.props.handleSubmit(accessTokenValue);
    this.props.logMeIn(values.token, values.username);
    this.props.fetchAuthUserData();
    this.props.fetchAuthUserGists();
    this.props.navigate("/home");
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
                () => ({
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

const mapDispatchToProps = (dispatch) => {
  return {
    logMeIn: (token, username) => {
      dispatch(logMeIn(token, username));
    },
    fetchAuthUserData: () => {
      dispatch(fetchAuthUserData())
    },
    fetchAuthUserGists:()=>{
      dispatch(fetchMyGists())
    }
  };
};

export default RouterComponent(connect(null, mapDispatchToProps)(LoginPage));

// export default RouterComponent(LoginPage);

// export default compose(RouterComponent, connect(mapDispatchToProps))(LoginPage);
