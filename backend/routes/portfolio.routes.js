const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const db = require('../db');
const Portfolio = require("../models/portfolioModel");
const Stock = require("../models/stockModel")
const Connector = require("../models/connectorModel")



router.get("/getPortfolios", async (req, res) => {
  const { email } = req.query; // get the email parameter from the query string
  const result = await Portfolio.getPortfolios(email);
  if (!result) {
    res.status(500).send("Problems with getting portfolios.");
  } else {
    res.status(200).json(result); // send the data as JSON
  }
});








router.post("/", async (req, res) => {
  const stockList = req.body.stocks
  const portfolio = new Portfolio(req.body.description, req.body.nameportfolio, req.body.investmentgoals, req.body.risktolerance, req.body.timehorizon, req.body.sectorpreferences, req.body.geographicpreferences, req.body.email);
    const result = await portfolio.insertNewPortfolio();
    if (!result) {
      res.status(500).send("Problems with sign up. Please try again later.");
    } else {
      
      res.status(201).send(result.toString());
  }
  for (let i = 0; i < stockList.length; i++) {
    let stockElement = stockList[i]
    const stock = new Stock(stockElement.ticker, stockElement.name)
    const result1 = await stock.insertNewStock();

    const connector = new Connector(stockElement.percentage, result.toString(), req.body.email, stockElement.ticker)
    const result2 = await connector.insertNewConnection();
    
  }
  //const stock = new Stock(req.body.ticker, req.body.name)
  //console.log(stock)
  //const result1 = await stock.insertNewStock();
 

});



module.exports = router;
