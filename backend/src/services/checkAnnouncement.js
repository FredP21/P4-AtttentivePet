/* eslint-disable consistent-return */
const Joi = require("joi");

const checkAddAd = (req, res, next) => {
  const schema = Joi.object({
    desc: Joi.string().min(10).max(250).required(),
    city: Joi.string().required(),
    phoneNumber: Joi.string().length(10).required(),
    statusId: Joi.number().required(),
    validationId: Joi.number().required(),
    userId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  next();
};
const checkUpdateAd = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().min(10).max(250).required(),
    city: Joi.string().required(),
    phoneNumber: Joi.string().length(10).required(),
    statusId: Joi.number().required(),
    validationId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  next();
};

module.exports = { checkAddAd, checkUpdateAd };
