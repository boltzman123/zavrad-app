import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function MyPortfolioCard({ id, name, description }) {
  return (
    <Link to={`/portfolio/${id}`} style={{ textDecoration: "none" }}>
      <Card style={{ maxWidth: "1000px", margin: "20px auto", border: "1px solid #ccc", borderRadius: "5px" }}>
        <Card.Body>
          <Card.Title style={{ color: "#333" }}>{name}</Card.Title>
          <Card.Text style={{ color: "#666" }}>{description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default MyPortfolioCard;
