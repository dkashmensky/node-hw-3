const joi = require('@hapi/joi');

module.exports.create_user_schema = joi.object({
  username: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  fullname: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp('^[0-9a-zA-Z]{8,}$'))
    .required(),
  type: joi
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
  fullname: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2 })
    .required(),
});

module.exports.create_truck_schema = joi.object({
  name: joi
    .string()
    .alphanum()
    .min(3),
  type_id: joi
    .number()
    .min(1)
    .max(3),
});

module.exports.update_truck_schema = joi.object({
  id: joi.number().min(1),
  name: joi
    .string()
    .alphanum()
    .min(3),
  type_id: joi
    .number()
    .min(1)
    .max(3),
});

module.exports.check_id = joi.object({
  id: joi
    .number()
    .min(1)
    .required(),
});

module.exports.create_load_schema = joi.object({
  name: joi
    .string()
    .alphanum()
    .min(3)
    .required(),
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
  capacity: joi
    .number()
    .min(1)
    .required(),
});

module.exports.update_load_schema = joi.object({
  id: joi
    .number()
    .min(1)
    .required(),
  name: joi
    .string()
    .alphanum()
    .min(3)
    .required(),
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
  capacity: joi
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
