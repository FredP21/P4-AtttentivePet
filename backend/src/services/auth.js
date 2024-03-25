const Joi = require("joi");

const checkLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json({ message: error.details[0].message });
  }
};
const checkRegister = (req, res, next) => {
  const schema = Joi.object({
    nickname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    res.status(400).json({ message: error.details[0].message });
  }
};

// const checkAuth = (req, res, next) => {
//   const token = req.cookies.user_token; // Accédez au token directement via req.cookies.user_token
//   console.log(token);
//   if (token !== undefined) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         res.status(403).json({ message: "Unauthorized" });
//       } else {
//         req.user = user;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };
// const checkAdmin = (req, res, next) => {
//   if (req.user.is_admin === 1) {
//     next();
//   } else {
//     res.status(403).json({ message: "Unauthorized" });
//   }
// };
module.exports = { checkLogin, checkRegister };
// Path: backend/src/controllers/authControllers.js
