const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for Employee
const DataSchema = new mongoose.Schema({
    timestamp: {
        type: String,
    },
    employeeId: {
        type: String,
    },
    date: {
        type: String,
    },
});



// Create the Employee model
const DataModel = mongoose.model('Data', DataSchema);

module.exports = DataModel;