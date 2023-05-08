const db = require("../db/index");

module.exports = class Portfolio {
  constructor(
    description,
    nameportfolio,
    investmentgoals,
    risktolerance,
    timehorizon,
    sectorpreferences,
    geographicpreferences,
    email) {
    this.description = description;
    this.nameportfolio = nameportfolio;
    this.investmentgoals = investmentgoals;
    this.risktolerance = risktolerance;
    this.timehorizon = timehorizon;
    this.sectorpreferences = sectorpreferences;
    this.geographicpreferences = geographicpreferences;
    this.email = email;
  }

  async insertNewPortfolio() {
    let sql = `
        INSERT INTO portfolio 
        (description, nameportfolio, investmentgoals, risktolerance, timehorizon, sectorpreferences, geographicpreferences, email)
        VALUES
        ($1,$2, $3, $4, $5, $6, $7, $8)
        RETURNING portfolioid;
    `;
  
    try {
      let result = await db.query(sql, [
        this.description,
        this.nameportfolio,
        this.investmentgoals,
        this.risktolerance,
        this.timehorizon,
        this.sectorpreferences,
        this.geographicpreferences,
        this.email
      ]);
      return result.rows[0].portfolioid;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  

  static async  getPortfolios(email) {
    let sql = `
        SELECT * FROM portfolio where portfolio.email = $1;
        `;

    try {
      let result = await db.query(sql, [email]);
      return result.rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
