import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import PortfolioCard from "../components/PortfolioCard";
import MyPortfolios from "../components/MyPortfolios";

function Home() {
  return (
    <React.Fragment>
      <Header></Header>
      <MyPortfolios></MyPortfolios>
    </React.Fragment>
  );
}

export default Home;
