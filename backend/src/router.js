const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const mimetype = fileTypes.test(file.mimetype);
    if (!mimetype) {
      return cb("Error: File type not supported");
    }
    cb(null, "public/uploads");
    return "";
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// Import userControllers module for handling item-related operations
const userControllers = require("./controllers/userControllers");
const announcementControllers = require("./controllers/announcementControllers");
const authControllers = require("./controllers/authControllers");
const { checkLogin } = require("./services/auth");
const { checkRegister } = require("./services/auth");
const { checkAuth } = require("./services/auth");
const { checkAdmin } = require("./services/auth");
const { checkAddAd } = require("./services/checkAnnouncement");
const { checkUpdateAd } = require("./services/checkAnnouncement");

// Auth

router.get("/auth", authControllers.getUser);
router.post("/register", checkRegister, authControllers.add);
router.post("/auth", checkLogin, authControllers.login);
router.post("/logout", authControllers.logout);

// Announcements
router.get(
  "/announcements/statusandvalidation/:id",
  announcementControllers.readAllByStatusIdAndValidation
);

/* use middleware to only give access to user */
router.use(checkAuth);

router.get("/announcements/user/:id", announcementControllers.readAllByUserId);
router.post(
  "/announcements",
  upload.single("image"),
  checkAddAd,
  announcementControllers.add
);
router.put(
  "/announcements/:id",
  upload.single("image"),
  checkUpdateAd,
  announcementControllers.edit
);
router.delete("/announcements/:id", announcementControllers.destroy);
router.get("/announcements", announcementControllers.browse);
router.get("/announcements/:id", announcementControllers.read);

/* use middleware to only give access to admin */
router.use(checkAdmin);

router.get(
  "/announcements/statement/:id",
  announcementControllers.readAllByValidationId
);
router.put(
  "/announcements/validation/:id",
  announcementControllers.editValidation
);
// Users
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
