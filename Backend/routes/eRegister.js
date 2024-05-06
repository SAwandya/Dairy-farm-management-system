const express = require('express');
const EmployeeModel = require('../models/Employees');
const router = express.Router();
const TaskModel = require('../models/Tasks');

const csv = require('csv-parser');
const fs = require('fs');
const DataModel = require("../models/Data");

const LeaveModel = require('../models/Leaves')
router.post('/createEmployee', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});
// Route to check if an employee ID already exists
router.get('/checkEmployeeId/:employeeId', async(req, res) => {
    const { employeeId } = req.params;
    try {
        const existingEmployee = await EmployeeModel.findOne({ employeeId });
        res.json({ exists: !!existingEmployee });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to check if a task ID already exists
router.get('/checkTaskID/:taskID', (req, res) => {
    const { taskID } = req.params;
    TaskModel.findOne({ taskID }) // Query the TaskModel to find a task with the given taskID
        .then(task => {
            const exists = !!task; // If task is found, exists will be true, otherwise false
            res.json({ exists });
        })
        .catch(err => res.status(500).json({ error: 'Failed to check task ID', details: err }));
});
router.get('/', (req, res) => {
    EmployeeModel.find({})
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
});

router.put('/updateEmployee/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

router.get('/getEmployee/:id', (req, res) => {
    const employeeId = req.params.id;
    EmployeeModel.findById(employeeId)
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});

router.delete('/deleteEmployee/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndDelete({ _id: id })
        .then(employee => res.json(employee))
        .catch(err => res.json(err));
});
router.post('/createTask', (req, res) => {
    TaskModel.create(req.body)
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});
router.get('/task', (req, res) => {
    TaskModel.find({})
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});
router.put('/updateTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});
router.get('/getTask/:id', (req, res) => {
    const TaskID = req.params.id;
    TaskModel.findById(TaskID)
        .then(Task => res.json(Task))
        .catch(err => res.json(err));
});

router.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndDelete({ _id: id })
        .then(Task => res.json(Task))
        .catch(err => res.json(err));
});
router.post('/submitLeave', (req, res) => {
    LeaveModel.create(req.body)
        .then(leaves => res.json(leaves))
        .catch(err => res.json(err));
});
router.get('/leave', (req, res) => {
    LeaveModel.find({})
        .then(leaves => res.json(leaves))
        .catch(err => res.json(err));
});


router.put('/leave/:id', (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    // Assuming you have a MongoDB model for leaves

    // Find the leave by ID and update its status
    LeaveModel.findByIdAndUpdate({ _id: id }, { status }, { new: true })
        .then(updatedLeave => {
            res.json(updatedLeave);
        })
        .catch(err => {
            console.error('Error updating leave status:', err);
            res.status(500).json({ error: 'Error updating leave status' });
        });
});

router.get('/data', (req, res) => {
    const dataList = [];
    fs.createReadStream('Data/data.csv')
        .pipe(csv())
        .on('data', (row) => {
            // Assuming your CSV file has columns 'Timestamp', 'Employee ID', and 'Date'
            const data = new DataModel({
                timestamp: row.Timestamp,
                employeeId: row['Employee ID'],
                date: row.Date
            });
            dataList.push(data);
        })
        .on('end', () => {
            res.json(dataList);
        });
});
module.exports = router;