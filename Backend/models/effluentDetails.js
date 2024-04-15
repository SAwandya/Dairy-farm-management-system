const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const effluentDetailSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    grazingArea: {
        type: String,
        required: true
    },
    wasteCollected: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Waste collected must be an integer'
        }
    },
    wasteType: {
        type: String,
        enum: ['Weeds', 'livestockManure', ' dicardedProduction', 'other'],
        required: true
    }
});

const EffluentDetail = mongoose.model("EffluentDetail", effluentDetailSchema);

module.exports = EffluentDetail;
