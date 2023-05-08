import axios from "axios";
import React, { useState } from "react";
import PortfolioCard from "./PortfolioCard";
var myary = [];

const ChatgptForm = (props) => {
  const {
    portfolios,
    investmentGoals,
    timeHorizon,
    riskTolerance,
    geographicPreferences,
    industryPreferences,
  } = props;

  if (portfolios.length == 0) {
    console.log("Nema oglasa");
    return <div>Nema oglasa</div>;
  } else {
    return (
      <>
        <div style={{ display: portfolios.length == 0 ? "none" : "" }}>
          <hr />
          <div>
            {portfolios.map((portfolio) => {
              return (
                <PortfolioCard
                  key={portfolio.portfolioName}
                  portfolio={portfolio}
                  investmentGoals = {investmentGoals}
                  timeHorizon = {timeHorizon}
                  riskTolerance = {riskTolerance}
                  geographicPreferences = {geographicPreferences}
                  industryPreferences = {industryPreferences}
                ></PortfolioCard>
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default ChatgptForm;
