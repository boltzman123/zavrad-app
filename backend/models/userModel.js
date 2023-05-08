const db = require("../db/index");

module.exports = class User {
  constructor(name, surname, email, password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }

  static async checkEmail(email) {
    let sql = `
            SELECT * FROM users where email = $1
        `;

    try {
      let result = await db.query(sql, [email]);
      if (result.rowCount > 0) return "Account with that email already exists";

      return null;
    } catch (e) {
      console.log(e);
    }
  }

  static async checkPassword(email, password) {
    let sql = `
            SELECT * FROM users WHERE email = $1 AND password = $2;
        `;

    try {
      let result = await db.query(sql, [email, password]);
      return result.rows;
    } catch (e) {
      return false;
    }
  }

  async insertNewUser() {
    let sql = `
        INSERT INTO users 
        (username, usersurname, email,password)
        VALUES
        ($1,$2, $3, $4);
        `;

    try {
      let result = await db.query(sql, [this.name, this.surname, this.email, this.password]);
      return result.rowCount;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getUser() {
    let sql = `
        SELECT * FROM korisnik where email = $1 AND password = $2;
        `;

    try {
      let result = await db.query(sql, [this.email, this.password]);
      return result.rows > 0;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
