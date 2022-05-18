import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import { SearchOutlined } from "@ant-design/icons";
import { CFSWrapper, ContentWrapper, CSBWrapper } from "../../shared/styles";
import { SearchBox } from "../SearchBox/SearchBox";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import { Dropdown, Button, Menu, Avatar, Divider } from "antd";
import { Link } from "react-router-dom";

const ourMenu = (items) => <Menu items={[...items]} />;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginButton = this.handleLoginButton.bind(this);
    this.state = {
      userData: null,
    };
    this.menuItems = [];
  }

  componentDidMount() {}

  handleLoginButton() {
    // this.setState({ loggedIn: true });
    this.props.navigate("/login");
  }

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      var userData = JSON.parse(localStorage.getItem("user-data"));
      this.menuItems = [
        {
          label: (
            <>
              <Link to="/user">
                <h5>Signed in as</h5>
                <h4>{userData?.name}</h4>
              </Link>
            </>
          ),
        },
        {
          label: <Divider />,
          disabled: true,
        },
        {
          label: <Link to="/user">Your Gists</Link>,
        },
        {
          label: <Link to="/user">Your Starred Gists</Link>,
        },
        {
          label: <Link to="/user">Help</Link>,
        },
        {
          label: <Divider />,
          disabled: true,
        },
        {
          label: <Link to="/user">Your Github Profile</Link>,
        },
        {
          label: <Link to="/user">Sign Out</Link>,
        },
      ];
    }
    return (
      <header className="header-style emumba-bg">
        <ContentWrapper>
          <CSBWrapper>
            <Link to="/home">
              <Logo fillColor="#ffffff" />
            </Link>
            <CFSWrapper gap={4}>
              <SearchBox
                placeholder="Search Notes..."
                bordered={true}
                suffix={<SearchOutlined />}
              />
              {!loggedIn ? (
                <Button onClick={this.handleLoginButton}>Login</Button>
              ) : (
                <Dropdown
                  overlay={ourMenu(this.menuItems)}
                  placement="bottom"
                  arrow
                >
                  <Avatar src={userData?.avatar_url} size={50} />
                </Dropdown>
              )}
            </CFSWrapper>
          </CSBWrapper>
        </ContentWrapper>
      </header>
    );
  }
}

export default RouterComponent(Header);
