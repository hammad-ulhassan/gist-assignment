import React from "react";
import "./Header.css";
import Logo from "../Logo/Logo";
import {
  CFSWrapper,
  ContentWrapper,
  CSBWrapper,
  AvatarWrapper,
  SearchBox
} from "../../shared/styles";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import { Dropdown, Button, Menu } from "antd";
import { Link } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar";
import { connect } from "react-redux";
import { selectAuthUserData, selectIsLoggedIn } from "../../redux/credentialSlice";
import { searchGists } from "../../redux/searchSlice";

const ourMenu = (items) => <Menu items={[...items]} />;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginButton = this.handleLoginButton.bind(this);
    this.menuItems = [];
    this.handleLogoutButton = this.handleLogoutButton.bind(this);
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleLoginButton() {
    this.props.navigate("/login");
  }

  handleLogoutButton(){
    this.props.handleLogout()
  }

  handleSearch(e){
    // console.log(e)
    // this.props.handleSearch(e.target.value)
    this.props.searchGists(e.target.value);
    this.props.navigate("/search")
  }

  render() {

    if (this.props.isLoggedIn && this.props.authUserData) {
      this.menuItems = [
        {
          label: (
            <>
              <Link to="/me">
                <h5>Signed in as</h5>
                <h4>{this.props.authUserData?.name}</h4>
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
          label: <Button onClick={this.handleLogoutButton} type="link">Sign Out</Button>,
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
            <SearchBox.Search placeholder="Search..." allowClear onSearch={this.handleSearch} />
              {!(this.props.isLoggedIn && this.props.authUserData) ? (
                <Button onClick={this.handleLoginButton}>Login</Button>
              ) : (
                <Dropdown
                  overlay={ourMenu(this.menuItems)}
                  placement="bottom"
                  arrow
                >
                  <AvatarWrapper>
                    <UserAvatar src={this.props.authUserData?.avatar_url} size={50} />
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: selectIsLoggedIn(state),
    authUserData: selectAuthUserData(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchGists: (searchInput) => {
      dispatch(searchGists(searchInput));
    },
  };
}

export default RouterComponent(connect(mapStateToProps, mapDispatchToProps)(Header));
