const express = require('express');
const EmployeeModel = require('../models/Employees');
const router = express.Router();
const TaskModel = require('../models/Tasks');
router.post('/createEmployee', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err));
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
module.exports = router;