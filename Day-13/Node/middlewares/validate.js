const Joi = require("joi");

exports.registerValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    age: Joi.number().min(18).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return next(error);

  next();
};
