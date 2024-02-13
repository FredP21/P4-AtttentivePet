const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const announcementControllers = require("./controllers/announcementControllers");
const authControllers = require("./controllers/authControllers");
const { checkLogin } = require("./services/auth");
const { checkRegister } = require("./services/auth");

// Auth

router.post("/register", checkRegister, authControllers.add);
router.post("/auth", checkLogin, authControllers.login);
router.post("/logout", authControllers.logout);

// Users
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

// Announcements

router.get("/announcements", announcementControllers.browse);
router.get("/announcements/:id", announcementControllers.read);
router.get("/announcements/user/:id", announcementControllers.readAllByUserId);
router.get(
  "/announcements/statusandvalidation/:id",
  announcementControllers.readAllByStatusIdAndValidation
);
router.get(
  "/announcements/statement/:id",
  announcementControllers.readAllByValidationId
);
router.post("/announcements", announcementControllers.add);
router.put("/announcements/:id", announcementControllers.edit);
router.put(
  "/announcements/validation/:id",
  announcementControllers.editValidation
);
router.delete("/announcements/:id", announcementControllers.destroy);

/* ************************************************************************* */

module.exports = router;
