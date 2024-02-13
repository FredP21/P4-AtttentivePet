// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const announcements = await tables.announcement.readAll();

    // Respond with the items in JSON format
    res.json(announcements);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const announcement = await tables.announcement.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (announcement == null) {
      res.sendStatus(404);
    } else {
      res.json(announcement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const readAllByUserId = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const announcement = await tables.announcement.readAllByUserId(
      req.params.id
    );

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (announcement == null) {
      res.sendStatus(404);
    } else {
      res.json(announcement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const readAllByStatusIdAndValidation = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const announcement =
      await tables.announcement.readAllByStatusIdAndValidation(
        req.params.id,
        2
      );

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (announcement == null) {
      res.sendStatus(404);
    } else {
      res.json(announcement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const readAllByValidationId = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const announcement = await tables.announcement.readAllByValidationId(
      req.params.id
    );

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (announcement == null) {
      res.sendStatus(404);
    } else {
      res.json(announcement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// const edit = async (req, res, next) => {
//   try {
//     const announcement = req.body;
//     const { id } = req.params;
//     const [result] = await tables.announcement.update(id, announcement);
//     if (result.affectedRows === 0) {
//       res.sendStatus(404);
//     } else {
//       res.sendStatus(204);
//     }
//     next();
//   } catch (err) {
//     res.sendStatus(500);
//     next(err);
//   }
// };

const edit = async (req, res, next) => {
  try {
    const announcement = req.body;
    const { id } = req.params;
    const [result] = await tables.announcement.update({ id, ...announcement });
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
    next();
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

const editValidation = async (req, res, next) => {
  try {
    const { validationId } = req.body;
    const { id } = req.params;
    const result = await tables.announcement.updateValidation({
      validationId,
      id,
    });
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
    next();
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const announcement = req.body;
  console.info(announcement);

  try {
    // Insert the announcement into the database
    const insertId = await tables.announcement.create(announcement);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted announcement
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tables.announcement.delete(id);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
    next();
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readAllByUserId,
  readAllByStatusIdAndValidation,
  readAllByValidationId,
  edit,
  // editStatus,
  editValidation,
  add,
  destroy,
};
