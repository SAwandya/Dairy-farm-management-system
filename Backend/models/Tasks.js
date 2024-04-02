const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for Employee
const TaskSchema = new mongoose.Schema({
    taskID: {
        type: String,
        unique: true,
        required: true

    },
    taskinfo: {
        type: String,

    },

    employeeId: {
        type: String,

    },
    employeeName: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },

});
TaskSchema.pre('save', async function(next) {
    // Hash the password if it exists
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
const TaskModel = mongoose.model('Task', TaskSchema);

// Create the Employee model
module.exports = TaskModel;