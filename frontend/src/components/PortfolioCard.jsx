import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Button from "react-bootstrap/Button";
import axios from "axios";


const portfolioCardStyles = {
  maxWidth: 500,
  margin: "auto",
  marginTop: 20,
  marginBottom: 20
};

const PortfolioCard = ({
  portfolio,
  investmentGoals,
  timeHorizon,
  riskTolerance,
  geographicPreferences,
  industryPreferences,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaved(true);

    try {
      const res = await axios.post("http://192.168.1.6:3001/portfolio", {
        description: portfolio.description,
        nameportfolio: portfolio.portfolioName,
        investmentgoals: investmentGoals,
        risktolerance: riskTolerance,
        timehorizon: timeHorizon,
        sectorpreferences:industryPreferences.join(', '),
        geographicpreferences: geographicPreferences.join(', '),
        email: JSON.parse(localStorage.getItem("user")),
        stocks:portfolio.stocks
    
      });
        console.log(res.data);

    } catch (error) {
      alert("Korisnik s tim emailom već postoji!");
    }
  };

  if (!portfolio || isSaved) {
    return null;
  }

  return (
    <Card style={portfolioCardStyles}>
      <Card.Body>
        <Card.Title>{portfolio.portfolioName}</Card.Title>
        <Card.Text>{portfolio.description}</Card.Text>
        <ListGroup className="list-group-flush">
          {portfolio.stocks.map((stock, index) => (
            <ListGroupItem key={index}>
              <b>Ticker:</b> {stock.ticker}
              <br />
              <b>Name:</b> {stock.name}
              <br />
              <b>Percentage:</b> {stock.percentage}%
            </ListGroupItem>
          ))}
        </ListGroup>
        <Button variant="success" onClick={handleSave}>
          Save Portfolio
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PortfolioCard;
