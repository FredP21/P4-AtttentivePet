/* eslint-disable consistent-return */
const Joi = require("joi");

const checkAddAd = (req, res, next) => {
  const schema = Joi.object({
    image: Joi.string().required(),
    desc: Joi.string().min(10).max(250).required(),
    city: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    statusId: Joi.number().required(),
    validationId: Joi.number().required(),
    userId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
const checkUpdateAd = (req, res, next) => {
  const schema = Joi.object({
    imagePet: Joi.string().required(),
    description: Joi.string().min(10).max(250).required(),
    city: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    statusId: Joi.number().required(),
    validationId: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = { checkAddAd, checkUpdateAd };
