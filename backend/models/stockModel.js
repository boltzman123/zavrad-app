const db = require("../db/index");

module.exports = class Stock {
  constructor(ticker, name) {
    this.ticker = ticker;
    this.name = name;
  }

  async insertNewStock() {
    let sql = `
        INSERT INTO securities 
        (ticker, name)
        VALUES
        ($1,$2)
        RETURNING ticker;
    `;

    try {
      let result = await db.query(sql, [
          this.ticker,
          this.name
      ]);
      return result.rows[0].ticker;
    } catch (e) {
      console.log(e);
      return false;
    }
  }


};
