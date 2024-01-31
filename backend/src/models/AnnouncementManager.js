const AbstractManager = require("./AbstractManager");

class AnnouncementManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "announcement" });
  }

  // The C of CRUD - Create operation

  async create({
    image,
    desc,
    city,
    phoneNumber,
    validationId,
    statusId,
    userId,
  }) {
    // Execute the SQL INSERT query to add a new announcement to the "announcement" table
    const [result] = await this.database.query(
      `insert into ${this.table} values (?,?,?,?,?,?,?)`,
      [image, desc, city, phoneNumber, validationId, statusId, userId]
    );

    // Return the ID of the newly inserted announcement
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific announcement by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the announcement
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all announcements from the "announcement" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of announcements
    return rows;
  }

  async readAllByUserId(userId) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [userId]
    );

    return rows;
  }

  async readAllByStatusIdAndValidation(statusId, validationId) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where status_id = ? and validation_id = ?`,
      [statusId, validationId]
    );

    return rows;
  }

  async readAllByValidationId(validationId) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where validation_id = ?`,
      [validationId]
    );

    return rows;
  }

  // The U of CRUD - Update operation
  async update({ imagePet, description, city, phoneNumber, statusId, id }) {
    // Execute the SQL UPDATE query to modify an existing announcement
    const result = await this.database.query(
      `update ${this.table} set image_pet = ?, description = ?, city = ?, phone_number = ?, status_id = ? where id = ?`,
      [imagePet, description, city, phoneNumber, statusId, id]
    );

    // Return the result of the query
    return result;
  }

  async updateValidation({ validationId, id }) {
    // Execute the SQL UPDATE query to modify an existing announcement
    const [result] = await this.database.query(
      `update ${this.table} set validation_id = ? where id = ?`,
      [validationId, id]
    );

    // Return the result of the query
    return result;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return the result of the query
    return result;
  }
}

module.exports = AnnouncementManager;
