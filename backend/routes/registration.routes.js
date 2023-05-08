const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const db = require('../db');
const User = require("../models/UserModel");

router.post("/", async (req, res) => {
    console.log("u REGIIJU SAM")
    const user = new User(req.body.name, req.body.surname, req.body.email, req.body.password);
    const result = await user.insertNewUser();
    if (!result) {
      res.status(500).send("Problems with sign up. Please try again later.");
    } else {
      res.status(201).send("User created successfully.");
    }
});
  
module.exports = router;
