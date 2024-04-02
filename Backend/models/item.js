
const mongoose = require('mongoose');
const Joi = require("joi");

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    itemPriority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    perUnitCost: {
        type: Number,
        required: true
    }
});
const Item = mongoose.model('Item', itemSchema);

function validateItem(item) {
    const schema = Joi.object({
        itemName: Joi.string().required(),
        description: Joi.string().required(),
        itemPriority: Joi.string().valid('Low', 'Medium', 'High').default('Low'),
        perUnitCost: Joi.number().required()
    });

    var result = schema.validate(item);
    return result;
}

exports.validate = validateItem;
exports.Item = Item;
exports.itemSchema = itemSchema;