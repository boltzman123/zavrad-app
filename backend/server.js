const express = require("express");
const app = express();
const db = require('./db')
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser")




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());

const loginRoute = require("./routes/login.routes");
const registrationRoute = require("./routes/registration.routes")
const chatgptRoute = require("./routes/chatgpt.routes")
const portfolioRoute = require("./routes/portfolio.routes")

app.use("/login", loginRoute);
app.use("/registration", registrationRoute)
app.use("/chat", chatgptRoute)
app.use("/portfolio", portfolioRoute)


app.listen(3001, () => {
  console.log("Server listening on port " + "3001");
});
