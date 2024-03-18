const express = require('express');
const EmployeeModel = require('../models/Employees');
const router = express.Router();

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

module.exports = router;