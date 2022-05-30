import "./MainLayout.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { ContentWrapper } from "../../shared/styles";
import React from "react";

export default class MainLayout extends React.Component {

  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount(){
  }

  handleLogout(){
    this.props.handleLogout();
  }

  handleSearch(e){
    this.props.handleSearch(e)
  }

  render() {
    return (
      <section id="page">
        <Header handleLogout={this.handleLogout} loggedIn={this.props.loggedIn} userData={this.props.userData} handleSearch={this.handleSearch}/>
        <main>
          <ContentWrapper>
            <Outlet/>
          </ContentWrapper>
        </main>
      </section>
    );
  }
}
