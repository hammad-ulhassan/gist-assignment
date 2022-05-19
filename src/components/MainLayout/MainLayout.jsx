import "./MainLayout.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { ContentWrapper } from "../../shared/styles";
import React from "react";

export default class MainLayout extends React.Component {

  componentDidMount(){
  }

  render() {
    return (
      <section id="page">
        <Header/>
        <main>
          <ContentWrapper>
            <Outlet/>
          </ContentWrapper>
        </main>
      </section>
    );
  }
}
