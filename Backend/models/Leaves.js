const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const LeaveSchema = new mongoose.Schema({
    leaveId: {
        type: String
    },
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    leaveType: {
        type: String
    },
    reason: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Pending' // Default status is set to 'Pending'
    }
});

const LeaveModel = mongoose.model('Leave', LeaveSchema);

module.exports = LeaveModel;