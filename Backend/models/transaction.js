const mongoose = require('mongoose');
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
      date: {
    type: Date,
    required: true
    },    
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
      specialNotes: String
    }, { timestamps: false });

const Transaction = mongoose.model('Transaction', transactionSchema);

function validateTransaction(transaction) {
    const schema = Joi.object({
        type: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    });

    var result = schema.validate(transaction);
    return result;
}

exports.validateTransaction = validateTransaction;
exports.Transaction = Transaction;
exports.transactionSchema = transactionSchema;