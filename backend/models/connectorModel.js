const db = require("../db/index");

module.exports = class Connector {
    constructor(shareamount, portfolioid, email, ticker) {
        this.shareamount = shareamount;
        this.ticker = ticker;
        this.portfolioid = portfolioid
        this.email = email
  }

  async insertNewConnection() {
    let sql = `
        INSERT INTO sadrzidionice 
        (shareamount, portfolioid, email, ticker)
        VALUES
        ($1,$2, $3, $4)
    `;

    try {
      let result = await db.query(sql, [
          this.shareamount,
          this.portfolioid,
          this.email,
          this.ticker
      ]);
      return result.rows[0];
    } catch (e) {
      console.log(e);
      return false;
    }
  }


};
