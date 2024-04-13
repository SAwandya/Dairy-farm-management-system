const mongoose = require("mongoose");
const Joi = require("joi");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    itemType: {
        type: String,
        required: true,
    },

    supplierType: {
        type: String,
        required: true,
        enum: ['Contracted', 'Permanent'],
    },

    avgDeliveryTime: {
        type: Number,
        required: true,
      },
});

const Supplier = mongoose.model("Suppliers", supplierSchema);

function validateSupplier(supplier) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        itemType: Joi.string().required(),
        supplierType: Joi.string().valid('Contracted', 'Permanent').required(),
        avgDeliveryTime: Joi.number().required()
    });

    var result = schema.validate(supplier);

    return result;
}

exports.validate = validateSupplier;
exports.Supplier = Supplier;
exports.supplierSchema = supplierSchema;