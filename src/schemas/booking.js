const Joi = require('@hapi/joi');

const signinSchema = Joi.object({
  _id: Joi.string().required(),
  start: Joi.date().required(),
  time: Joi.number().required().min(1000),
});

module.exports = signinSchema;
