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

    deliveryDate: {
        type: Date,
        required: true,
    }
});

const Supplier = mongoose.model("Suppliers", supplierSchema);

function validateSupplier(supplier) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        itemType: Joi.string().required(),
        deliveryDate: Joi.date().required()
    });

    var result = schema.validate(supplier);

    return result;
}

exports.validate = validateSupplier;
exports.Supplier = Supplier;
exports.supplierSchema = supplierSchema;