const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create({ nickname, email, hashPassword }) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (nickname, email, hash_password) values (?,?,?)`,
      [nickname, email, hashPassword]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its email
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  async update({ nickname, password, email, id }) {
    // Execute the SQL UPDATE query to modify an existing user
    const [result] = await this.database.query(
      `update ${this.table} set nickname = ?, password = ?, email = ? where id = ?`,
      [nickname, email, password, id]
    );

    // Return the result of the query
    return result;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to remove the user from the database
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return the result of the query
    return result;
  }
}

module.exports = UserManager;
