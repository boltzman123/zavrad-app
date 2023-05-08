const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const db = require("../db");
const User = require("../models/UserModel");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});

chat = [];
let apiCounter = 0; // initialize the counter to zero
let openai = new OpenAIApi(configuration);


router.post("/", async (req, res) => {
  const { myary, err } = req.body;
  console.log("dobio sam ", myary);
  
  if (++apiCounter >= 3 && (!err || err == undefined)) { // increment the counter and check if it's >= 3
    openai = new OpenAIApi(configuration); // create a new OpenAIApi instance
    console.log("stvorio novi")
    apiCounter = 0; // reset the counter back to zero
  } 

    const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: myary,
      });
  console.log(completion.data.choices[0].message);
  res.send(completion.data.choices[0].message);
});
  
module.exports = router;
