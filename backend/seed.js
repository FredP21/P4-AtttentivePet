/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    await database.query("delete from status_announcement");
    await database.query("delete from status_validation");

    queries.push(
      database.query("insert into status_announcement(status) values (?)", [
        "trouvé",
      ])
    );
    queries.push(
      database.query("insert into status_announcement(status) values (?)", [
        "perdu",
      ])
    );
    queries.push(
      database.query("insert into status_validation(status) values (?)", [
        "En Attente",
      ])
    );
    queries.push(
      database.query("insert into status_validation(status) values (?)", [
        "Accepté",
      ])
    );
    queries.push(
      database.query("insert into status_validation(status) values (?)", [
        "Refusé",
      ])
    );
    queries.push(
      database.query(
        "insert into user(nickname, email, password, is_admin) values (?,?,?,?)",
        ["FredP", "gg@gg.com", "aazz", 1]
      )
    );
    queries.push(
      database.query(
        "insert into user(nickname, email, password) values (?,?,?)",
        ["FredG", "dd@dd.com", "bbzz"]
      )
    );
    queries.push(
      database.query(
        "insert into announcement(description, city, phone_number, validation_id, status_id, user_id) values (?,?,?,?,?,?)",
        ["lorem ipsum", "Paris", "0123456789", 1, 2, 1]
      )
    );
    queries.push(
      database.query(
        "insert into announcement(description, city, phone_number, validation_id, status_id, user_id) values (?,?,?,?,?,?)",
        ["lorem ipsum", "Paris", "0123456789", 2, 1, 2]
      )
    );
    queries.push(
      database.query(
        "insert into announcement(description, city, phone_number, validation_id, status_id, user_id) values (?,?,?,?,?,?)",
        ["lorem ipsum", "Paris", "0123456789", 2, 2, 2]
      )
    );
    queries.push(
      database.query(
        "insert into announcement(description, city, phone_number, validation_id, status_id, user_id) values (?,?,?,?,?,?)",
        ["lorem ipsum", "Paris", "0123456789", 1, 1, 1]
      )
    );
    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
