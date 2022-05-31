import React from "react";
import { RouterComponent } from "../RouterComponent/RouterComponent";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import { getAuthenticatedUserData } from "../../data/gists";
import HomePage from "../../pages/HomePage/HomePage";
import GistsPage from "../../pages/GistsPage/GistsPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import CreateGistPage from "../../pages/CreateGistPage/CreateGistPage";
import UserProfilePage from "../../pages/UserProfilePage/UserProfilePage";
import MyProfilePage from "../../pages/MyProfilePage/MyProfilePage";
import SearchPage from "../../pages/SearchPage/SearchPage";
import EditGistPage from "../../pages/EditGistPage/EditGistPage";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
      searchParam: null,
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  onLogin(credentials) {
    if (credentials) {
      localStorage.setItem("credentials", JSON.stringify(credentials));
      getAuthenticatedUserData().then((userData) => {
        localStorage.setItem("user-data", JSON.stringify(userData));
        localStorage.setItem("logged-in", true);
        this.setState({ userData: userData, loggedIn: true });
      });
    }
  }

  onLogout() {
    localStorage.removeItem("user-data");
    localStorage.setItem("logged-in", false);
    this.setState({ loggedIn: false, userData: null });
    this.props.navigate("/home");
  }

  handleSearch(e) {
    this.setState({ searchParam: e });
  }

  render() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              handleLogout={this.onLogout}
              loggedIn={this.state.loggedIn}
              userData={this.state.userData}
              handleSearch={this.handleSearch}
            />
          }
        >
          <Route
            path="home"
            element={<HomePage searchParam={this.state.searchParam} />}
          />
          <Route path="gist/:id" element={<GistsPage />} />
          <Route
            path="login"
            // element={<LoginPage handleSubmit={this.onLogin} />}
            element={<LoginPage/>}
          />
          <Route path="create" element={<CreateGistPage />} />
          <Route path="edit/:id" element={<EditGistPage />} />
          <Route path="user/:login" element={<UserProfilePage />} />
          <Route path="me" element={<MyProfilePage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    );
  }
}

export default RouterComponent(Root);
