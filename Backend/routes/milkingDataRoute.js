const express = require('express');
const router = express.Router();
const MilkingData = require('../models/milkingData');
const yup = require('yup');

const schema = yup.object().shape({
    amountOfMilk: yup.number().required().positive().integer(),
    duration: yup.number().required().positive().integer(),
    qualityCheckResult: yup.string().required().oneOf(['Pass', 'Fail']),
    issues: yup.string().notRequired(),
  });  

  router.post('/', async (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Content can not be empty" });
    }
  
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.errors });
    }
  
    try {
      const existingMilkingData = await MilkingData.find();
      const milkBatchId = existingMilkingData.length + 1;
  
      const newMilkingData = new MilkingData({
        milkBatchId,
        amountOfMilk: req.body.amountOfMilk,
        duration: req.body.duration,
        qualityCheckResult: req.body.qualityCheckResult,
        issues: req.body.issues,
      });
  
      await newMilkingData.save();
      res.status(201).json({ success: true, data: newMilkingData });
    } catch (error) {
      console.error('Error adding milking data:', error);
      res.status(500).json({ success: false, error: 'Failed to add milking data' });
    }
  });
  

router.get('/', async (req, res) => {
    try {
        const { date } = req.query;
        let milkingData;
        if (date) {
            milkingData = await MilkingData.find({ createdAt: { $gte: new Date(date) } });
        } else {
            milkingData = await MilkingData.find();
        }
        res.status(200).json({ success: true, data: milkingData });
    } catch (error) {
        console.error('Error fetching milking data:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch milking data' });
    }
});

router.get('/:timePeriod', async (req, res) => {
    const { timePeriod } = req.params;
    let milkingData;
    try {
        switch (timePeriod) {
            case 'last7days':
                const last7DaysDate = new Date();
                last7DaysDate.setDate(last7DaysDate.getDate() - 6);
                milkingData = await MilkingData.find({ createdAt: { $gte: last7DaysDate } });
                break;
            case 'lastMonth':
                const lastMonthDate = new Date();
                lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
                milkingData = await MilkingData.find({ createdAt: { $gte: lastMonthDate } });
                break;
            case 'last6months':
                const last6MonthsDate = new Date();
                last6MonthsDate.setMonth(last6MonthsDate.getMonth() - 6);
                milkingData = await MilkingData.find({ createdAt: { $gte: last6MonthsDate } });
                break;
            default:
                milkingData = await MilkingData.find();
                break;
        }
        res.status(200).json({ success: true, data: milkingData });
    } catch (error) {
        console.error('Error fetching milking data:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch milking data' });
    }
});

router.get('/:milkBatchId', async (req, res) => {
    const { milkBatchId } = req.params;
    try {
        const milkBatch = await MilkingData.findOne({ milkBatchId });
        if (!milkBatch) {
            return res.status(404).json({ success: false, error: 'Milk batch not found' });
        }
        res.status(200).json({ success: true, amountOfMilk: milkBatch.amountOfMilk });
    } catch (error) {
        console.error('Error fetching amount of milk:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch amount of milk' });
    }
});



module.exports = router;
