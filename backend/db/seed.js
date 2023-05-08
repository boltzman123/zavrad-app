const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "zavrad",
  password: "bazepodataka",
  port: 5432,
});

const sql_create_user = `
CREATE TABLE users
(
  userName VARCHAR(100) NOT NULL,
  userSurname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (email)
);
`;

const sql_create_portfolio = `
CREATE TABLE Portfolio
(
  portfolioId SERIAL PRIMARY KEY,
  description VARCHAR(700) NOT NULL,
  namePortfolio VARCHAR(100) NOT NULL,
  InvestmentGoals VARCHAR(255) NOT NULL,
  riskTolerance VARCHAR(100) NOT NULL,
  timeHorizon INT NOT NULL,
  sectorPreferences VARCHAR(255) NOT NULL,
  geographicPreferences VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  UNIQUE (portfolioId, email),
  FOREIGN KEY (email) REFERENCES users(email)
);


`;

const sql_create_securities = `
    
CREATE TABLE Securities
(
  Ticker VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (Ticker)
);
`;

const sql_create_performance = `
CREATE TABLE Performance
(
  performanseId SERIAL PRIMARY KEY,
  expectedReturn FLOAT NOT NULL,
  standardDeviation FLOAT NOT NULL,
  Sharpe_ratio FLOAT NOT NULL,
  date DATE NOT NULL,
  portfolioId INT NOT NULL,
  email VARCHAR(100) NOT NULL,
  FOREIGN KEY (portfolioId, email) REFERENCES Portfolio(portfolioId, email)
);
`;

const sql_create_sadrziDionice = `
CREATE TABLE sadrziDionice
(
  shareAmount FLOAT NOT NULL,
  portfolioId INT NOT NULL,
  email VARCHAR(100) NOT NULL,
  ticker VARCHAR(255) NOT NULL,
  PRIMARY KEY (portfolioId, email, ticker),
  FOREIGN KEY (portfolioId, email) REFERENCES Portfolio(portfolioId, email),
  FOREIGN KEY (ticker) REFERENCES Securities(ticker)
);
`;

let tables = [
  sql_create_user,
  sql_create_portfolio,
  sql_create_securities,
  sql_create_performance,
  sql_create_sadrziDionice,
];

let table_names = [
  "users",
  "Portfolio",
  "Securities",
  "Performance",
  "sadrziDionice",
];

(async () => {
  console.log("Creating tables");
  for (let i = 0; i < tables.length; i++) {
    console.log("Creating table " + table_names[i] + ".");
    try {
      await pool.query(tables[i], []);
      console.log("Table " + table_names[i] + " created.");
    } catch (err) {
      console.log("Error creating table " + table_names[i]);
      return console.log(err.message);
    }
  }

  await pool.end();
})();
