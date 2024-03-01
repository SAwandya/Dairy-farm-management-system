const mongoose = require("mongoose");
const Joi = require("joi");

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  managerType: {
    type: String,
    required: true,
  },
});

const Manager = mongoose.model("Managers", managerSchema);

function validateManager(manager) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    managerType: Joi.string().required(),
  });

  var result = schema.validate(manager);

  return result;
}

exports.validate = validateManager;
exports.Manager = Manager;
exports.managerSchema = managerSchema;
