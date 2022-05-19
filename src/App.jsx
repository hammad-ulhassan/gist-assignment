import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateGistPage from "./components/CreateGistPage/CreateGistPage";
import GistsPage from "./components/GistsPage/GistsPage";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import MainLayout from "./components/MainLayout/MainLayout";
import MyProfilePage from "./components/MyProfilePage/MyProfilePage";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import { getAuthenticatedUserData } from "./data/gists";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userData: null,
    }
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(credentials) {
    if (credentials) {
      localStorage.setItem("credentials", JSON.stringify(credentials));
      getAuthenticatedUserData().then(userData=>{
        localStorage.setItem('user-data', JSON.stringify(userData));
        localStorage.setItem('logged-in', true);
        this.setState({userData: userData, loggedIn: true})
      })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route path="home" element={<HomePage />} />
            <Route path="gist" element={<GistsPage />} />
            <Route
              path="login"
              element={<LoginPage handleSubmit={this.onLogin} />}
            />
            <Route path="create" element={<CreateGistPage />} />
            <Route path="user" element={< UserProfilePage/>} />
            <Route path="me" element={< MyProfilePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
