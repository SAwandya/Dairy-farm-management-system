const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionDetailSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    typeOfSession: {
        type: String,
        required: true,
        enum: ["Morning", "Evening"] // Only allow "Feeding" and "Grazing" as valid values
    },
    grazingArea: {
        type: String,
        required: true
    },
    cowBatch: {
        type: String,
        required: true
    },
    assignedEmployee: {
        type: String,
        required: true
    },
    grazingDuration: {
        type: String,
        required: true
    },
    onsiteFeedingDuration: {
        type: String,
        required: true
    }
});

const SessionDetail = mongoose.model("SessionDetail", sessionDetailSchema);

module.exports = SessionDetail;
