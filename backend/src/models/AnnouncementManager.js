const AbstractManager = require("./AbstractManager");

class AnnouncementManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    super({ table: "announcement" });
  }

  // The C of CRUD - Create operation

  async create({
    image,
    desc,
    city,
    phoneNumber,
    statusId,
    validationId,
    userId,
  }) {
    // Execute the SQL INSERT query to add a new announcement to the "announcement" table
    const [result] = await this.database.query(
      `insert into ${this.table} (image_pet, description, city, phone_number, status_id, validation_id, user_id) values (?,?,?,?,?,?,?)`,
      [image, desc, city, phoneNumber, statusId, validationId, userId]
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
    const [rows] = await this.database.query(
      `select announcement.*, user.nickname, status_announcement.status as statutAd, status_validation.status as validationAd from ${this.table} join user on announcement.user_id = user.id join status_announcement on announcement.status_id = status_announcement.id join status_validation on announcement.validation_id = status_validation.id`
    );

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
  async update({
    image,
    description,
    city,
    phoneNumber,
    statusId,
    validationId,
    id,
  }) {
    // Execute the SQL UPDATE query to modify an existing announcement
    const result = await this.database.query(
      `update ${this.table} set image_pet = ?, description = ?, city = ?, phone_number = ?, status_id = ?, validation_id = ? where id = ?`,
      [image, description, city, phoneNumber, statusId, validationId, id]
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
