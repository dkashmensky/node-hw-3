const joi = require('@hapi/joi');

module.exports.create_user_schema = joi.object({
  username: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  fullname: joi.string(),
  email: joi.string().email({ minDomainSegments: 2 }),
  password: joi
    .string()
    .pattern(new RegExp('^[0-9a-zA-Z]{8,}$'))
    .required(),
  role: joi
    .string()
    .valid('driver', 'shipper')
    .required(),
});

module.exports.change_pass_schema = joi.object({
  password: joi
    .string()
    .pattern(new RegExp('^[0-9a-zA-Z]{8,}$'))
    .required(),
});

module.exports.update_user_schema = joi.object({
  fullname: joi.string(),
  email: joi.string().email({ minDomainSegments: 2 }),
});

module.exports.create_truck_schema = joi.object({
  type: joi
    .string()
    .valid('SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT')
    .required(),
});

module.exports.update_truck_schema = joi.object({
  id: joi.string().required(),
  comment: joi.string(),
});

module.exports.check_id = joi.object({
  id: joi.string().required(),
});

module.exports.create_load_schema = joi.object({
  dimensions: {
    length: joi
      .number()
      .min(1)
      .required(),
    height: joi
      .number()
      .min(1)
      .required(),
    width: joi
      .number()
      .min(1)
      .required(),
  },
  payload: joi
    .number()
    .min(1)
    .required(),
});

module.exports.update_load_schema = joi.object({
  id: joi.string().required(),
  dimensions: {
    length: joi
      .number()
      .min(1)
      .required(),
    height: joi
      .number()
      .min(1)
      .required(),
    width: joi
      .number()
      .min(1)
      .required(),
  },
  payload: joi
    .number()
    .min(1)
    .required(),
});

module.exports.get_loads_schema = joi.object({
  status: joi.string().valid('new', 'posted', 'assigned', 'shipped'),
});

module.exports.upload_avatar_schema = joi.object({
  file: joi.string(),
});
