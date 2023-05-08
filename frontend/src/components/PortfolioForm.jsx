import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  FormGroup,
  FormCheck,
  FormControl,
  Container,
} from "react-bootstrap";

import IndustryCategory from "./IndustryCategory";
import ChatGPT from "./ChatgptForm";
import { Modal, Spinner } from "react-bootstrap";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

var myary = [];
const years = Array.from({ length: 50 }, (_, i) => i);

const PortfolioForm = () => {
  const [description, setDescription] = useState("");
  const [namePortfolio, setNamePortfolio] = useState("");
  const [investmentGoals, setInvestmentGoals] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [timeHorizon, setTimeHorizon] = useState("");
  const [geographicPreferences, setGeographicPreferences] = useState("");
  const [industryPreferences, setIndustryPreference] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showRiskDescription, setShowRiskDescription] = useState(false);
  const [showTimeDescription, setShowTimeDescription] = useState(false);
  const [chatgptAnswer, setchatgptAnswer] = useState("");
  const [chat, setChat] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const industryOptions = [
    "Energy",
    "Information technology",
    "Health care",
    "Utilities",
    "Real estate",
    "Materials",
    "Industrials",
    "Communication services",
    "Consumer staples",
    "Consumer discretionary",
    "Financials",
  ];

  const geographicOptions = [
    "North America",
    "Europe",
    "Asia Pacific",
    "Latin America",
    "Middle East",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowModal(true);
    setSubmitting(true);

    const initializationText = `Imagine you are a financial advisor, an expert in investing. Your job is to know how to make the best investing decision based on the information I will give you.
    The information I will give you will include me: 
    1. Investment goals 
    2. Risk tolerance 
    3. Time horizon 
    4. Geographical preference 
    5. Industry preference 
  
  Based on that information your job is to find only stocks that are public and its data can be found on yahoo finance or with yahoo finance API. Each time I give you my list of preferences you will need to make me a list of a minimum of three portfolios. 
  
  Here is my list of preferences. 
      Rember to make a variable number of stocks in each portfolio to achieve my desired goals: 
      1. My investment goals: ${investmentGoals}. 
      2. My risk tolerance is ${riskTolerance}. 
      3. My time horizon through which I want to achieve my financial goals is in ${timeHorizon} years.
      4. My preferred geographical areas where I want to invest in are ${geographicPreferences.join(
        ", "
      )}. 
      My preferred industries where I want to invest in are ${industryPreferences.join(
        ", "
      )}  
    
  Understood? Don't start giving me the portfolios until I give you the second input. Do not generate any portfolios. You only need to agree with me on this prompt and remeber the preferences.`;

    const updatedChat1 = [{ role: "user", content: initializationText }];
    myary = myary.concat(updatedChat1);

    try {
      console.log("šaljem", myary);
      const res = await axios.post("http://192.168.1.6:3001/chat", {
        myary,
      });
      const updatedChat = [{ role: "assistant", content: res.data.content }];

      setChat(updatedChat);
      myary = myary.concat(updatedChat);

      setchatgptAnswer(res.data.content);
    } catch (error) {
      alert("An error occurred!1", chatgptAnswer);
    }
    try {
      const prompt = `
    Dont generate me any other message except this format because I need to extract only that information given in the format. 
    Remember the only response you need to give me is in the format I gave you in my message before, you cannot and mustn't say anything else!
    Your only response should be in the JSON format (JSON.parse() function MUST work!!), don't say anything else that you would usually say, dont start your response with "Here.."
    The most important thing is to give me an answer in the JSON format and dont change name of attributes in any of your answers. If you give me answer that is not in JSON format, error will happen. DONT ADD OR CHANGE ANYTHING IN YOUR FORMAT RESPONSE IF PREVIOUSLY NOT STATED!
    Generate a list of 3 portofolios. Number of stocks is variable and should be based on preference.
    Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
    [{
      "portfolioName": "name of the portfolio associated with financial goal",
      "stocks": [
        { "ticker": "", "name": "", "percentage":  },
      ],
      "description": "detailed description why you choose those stocks wih those distributions and how you plan to achieve my financial goals with this portoflio with a comment about each stock"
    }]`;

      const updatedChat2 = [{ role: "user", content: prompt }];
      myary = myary.concat(updatedChat2);

      console.log("šaljem", myary);
      const res = await axios.post("http://192.168.1.6:3001/chat", {
        myary,
      });
      const updatedChat = [{ role: "assistant", content: res.data.content }];

      setChat(updatedChat);
      myary = myary.concat(updatedChat);

      setchatgptAnswer(res.data.content);
      console.log(updatedChat[0].content);

      let parsedContent = updatedChat[0].content;

      if (typeof parsedContent === "string") {
        parsedContent = JSON.parse(parsedContent);
      }

      if (Array.isArray(parsedContent)) {
        // handle the case when the parsed content is an array
        console.log("Parsed content is an array:", parsedContent);
        setPortfolios(parsedContent);
      } else {
        // handle the case when the parsed content is an object with a "portfolios" property
        console.log("Parsed content is an object:", parsedContent.portfolios);
        const { portfolios } = JSON.parse(updatedChat[0].content);
        const portfoliosList = [...portfolios];
        setPortfolios(portfoliosList);
      }
    } catch (error) {
      console.log(error);
    }
    myary = [];
    setSubmitting(false);
    setShowModal(false);
  };

  const handleIndustryPreferenceChange = (selected) => {
    setIndustryPreference(selected);
  };

  const handleGeographicPreferenceChange = (selected) => {
    setGeographicPreferences(selected);
    console.log(selected);
  };
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const toggleRiskDescription = () => {
    setShowRiskDescription(!showRiskDescription);
  };

  const toggleTimeDescription = () => {
    setShowTimeDescription(!showTimeDescription);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="namePortfolio">
          <Form.Label>Name Portfolio</Form.Label>
          <Form.Control
            type="text"
            value={namePortfolio}
            onChange={(e) => setNamePortfolio(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="investmentGoals">
          <Form.Label>Investment Goals</Form.Label>
          <Form.Control
            type="text"
            value={investmentGoals}
            onFocus={toggleDescription}
            onBlur={toggleDescription}
            onChange={(e) => setInvestmentGoals(e.target.value)}
          />
          {showDescription && (
            <div
              style={{
                backgroundColor: "#f2f2f2",
                color: "black",
                border: "1px solid #ddd",
                padding: "10px",
              }}>
              What is the primary objective of your investment? Are you looking
              for long-term growth, capital preservation, income generation, or
              a combination of these?
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="riskTolerance">
          <Form.Label>Risk Tolerance</Form.Label>
          <Form.Control
            as="select"
            onFocus={toggleRiskDescription}
            onBlur={toggleRiskDescription}
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </Form.Control>
          {showRiskDescription && (
            <div
              style={{
                backgroundColor: "#f2f2f2",
                color: "black",
                border: "1px solid #ddd",
                padding: "10px",
              }}>
              How much risk are you comfortable taking in your portfolio? Are
              you willing to accept high volatility and potential losses in
              exchange for potentially higher returns, or do you prefer a more
              conservative approach with lower risk?
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="timeHorizon">
          <Form.Label>Time Horizon</Form.Label>
          <Form.Control
            as="select"
            value={timeHorizon}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setTimeHorizon(value);
            }}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year} year{year !== 1 && "s"}
              </option>
            ))}
          </Form.Control>
          {showTimeDescription && (
            <div
              style={{
                backgroundColor: "#f2f2f2",
                color: "black",
                border: "1px solid #ddd",
                padding: "10px",
              }}>
              What is your investment time horizon? Are you looking to invest
              for the short-term or long-term? This will help determine the
              appropriate asset allocation and investment strategy.e?
            </div>
          )}
        </Form.Group>

        <IndustryCategory
          name="Geographical preferences"
          lista={geographicOptions}
          onSelectionChange={
            handleGeographicPreferenceChange
          }></IndustryCategory>

        <IndustryCategory
          name="Industry preferences"
          lista={industryOptions}
          onSelectionChange={handleIndustryPreferenceChange}
        />

        <Button
          style={{ marginTop: 10 }}
          variant="primary"
          disabled={submitting}
          type="submit">
          Submit
        </Button>

        <ChatGPT
          portfolios={portfolios.length == 0 ? [] : portfolios}
          investmentGoals={investmentGoals}
          timeHorizon={timeHorizon}
          riskTolerance={riskTolerance}
          geographicPreferences={geographicPreferences}
          industryPreferences={industryPreferences}></ChatGPT>
      </Form>
      <Modal show={showModal} onHide={() => {}}>
        <Modal.Body style={{ textAlign: "center" }}>
          <ClipLoader
            css={override}
            size={50}
            color={"#123abc"}
            loading={showModal}
          />
          <p>Loading...</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default PortfolioForm;
