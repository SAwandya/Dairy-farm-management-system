const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pastureDetailSchema = new Schema({
    area: {
        type: String,
        required: true
    },
    fertilizerUsed: {
        type: String,
        required: true
    },
    feedingCapacity: {
        type: String,
        required: true
    },
    assignedEmployee: {
        type: String,
        required: true
    },
    typeOfPlantsPlanted: {
        type: String,
        required: true
    }
});

const PastureDetail = mongoose.model("PastureDetail", pastureDetailSchema);

module.exports = PastureDetail;
