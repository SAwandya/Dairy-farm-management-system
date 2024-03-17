const mongoose = require("mongoose");
const Joi = require("joi");
const { purchaseSchema } = require("./purchase");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  purchase: {
    type: purchaseSchema,
    required: true
  }
});

const Message = mongoose.model("Message", messageSchema);

function validateMessage(message) {
  const schema = Joi.object({
    message: Joi.string().required(),
    purchaseId: Joi.string().required(),
  });

  var result = schema.validate(message);

  return result;
}

exports.validate = validateMessage;
exports.Message = Message;
