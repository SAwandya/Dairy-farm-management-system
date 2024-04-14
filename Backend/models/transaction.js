const mongoose = require('mongoose');
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
      date: {
    type: Date,
    required: true
    },    
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        default: 'Expense'
    },
    description: {
        type: String,
        required: true
    },
    department: {
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
        date: Joi.date().required(),
        type: Joi.string().valid('Income', 'Expense').default('Expense'),
        description: Joi.string().required(),
        department: Joi.string().required(),
        value: Joi.number().required()
    });

    var result = schema.validate(transaction);
    return result;
}

exports.validate = validateTransaction;
exports.Transaction = Transaction;
exports.transactionSchema = transactionSchema;