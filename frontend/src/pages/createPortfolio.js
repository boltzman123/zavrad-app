import { Button, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import PortfolioCard from "../components/PortfolioCard";
import PortfolioForm from "../components/PortfolioForm"
import React from "react";
import ChatGPT from "../components/ChatgptForm";


function CreatePortfolio() {
  return (
    <React.Fragment>
      <Header></Header>
      <PortfolioForm></PortfolioForm>
    </React.Fragment>
  );
}

export default CreatePortfolio;
