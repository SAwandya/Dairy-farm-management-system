const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for Employee
const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        unique: true,
        required: true
    },
    employeeName: {
        type: String,
    },
    position: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    basicSalary: {
        type: Number,
    },
});

// Calculate total salary before saving
EmployeeSchema.pre('save', async function(next) {
    // Hash the password if it exists
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Create the Employee model
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;