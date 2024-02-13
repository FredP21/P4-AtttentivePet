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
module.exports = { checkLogin, checkRegister };
// Path: backend/src/controllers/authControllers.js
