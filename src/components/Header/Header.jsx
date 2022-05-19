import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import { SearchOutlined } from "@ant-design/icons";
import {
  CFSWrapper,
  ContentWrapper,
  CSBWrapper,
  AvatarWrapper,
} from "../../shared/styles";
import { SearchBox } from "../SearchBox/SearchBox";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import { Dropdown, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";

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
    const loggedIn = localStorage.getItem("logged-in");
    if (loggedIn) {
      var userData = JSON.parse(localStorage.getItem("user-data"));
      this.menuItems = [
        {
          label: (
            <>
              <Link to="/me" state={userData}>
                <h5>Signed in as</h5>
                <h4>{userData?.name}</h4>
              </Link>
            </>
          ),
        },
        {
          label: <hr />,
          disabled: true,
        },
        {
          label: <Link to="/me">Your Gists</Link>,
        },
        {
          label: <Link to="/me">Your Starred Gists</Link>,
        },
        {
          label: <Link to="/me">Help</Link>,
        },
        {
          label: <hr />,
          disabled: true,
        },
        {
          label: <Link to="/me">Your Github Profile</Link>,
        },
        {
          label: <Link to="/me">Sign Out</Link>,
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
                  <AvatarWrapper>
                    <UserAvatar src={userData?.avatar_url} size={50} />
                  </AvatarWrapper>
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
