import React, { useState, useEffect } from "react";
import axios from "axios";
import MyPortfolioCard from "./MyPortfolioCard";

const MyPortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "get",
      url: `http://192.168.1.6:3001/portfolio/getPortfolios?email=${email}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => {
        setPortfolios(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {portfolios.map((portfolio) => (
        <MyPortfolioCard
          key={portfolio.portfolioid}
          id={portfolio.portfolioid}
          name={portfolio.nameportfolio}
          description={portfolio.description.split(/[\.\?!]\s+/)[0]}
        />
      ))}
    </div>
  );
};

export default MyPortfolios;
