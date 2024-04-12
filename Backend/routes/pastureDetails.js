const router = require("express").Router();
const PastureDetail = require("../models/pastureDetails");

router.route("/add").post((req, res) => {
    const { area, fertilizerUsed, feedingCapacity, assignedEmployee, typeOfPlantsPlanted } = req.body;

    const newPastureDetail = new PastureDetail({
        area,
        fertilizerUsed,
        feedingCapacity,
        assignedEmployee,
        typeOfPlantsPlanted
    });

    newPastureDetail.save()
        .then(result => {
            console.log("Pasture detail saved successfully:", result);
            res.status(201).json(result);
        })
        .catch(error => {
            console.error("Error saving pasture detail:", error);
            res.status(500).json({ error: "Failed to save pasture detail" });
        });
});

router.route("/").get((req, res) => {
    PastureDetail.find()
        .then(pastureDetails => {
            res.json(pastureDetails);
        })
        .catch(error => {
            console.error("Error retrieving pasture details:", error);
            res.status(500).json({ error: "Failed to retrieve pasture details" });
        });
});

router.route("/update/:pastureId").put(async (req, res) => {
    const { area, fertilizerUsed, feedingCapacity, assignedEmployee, typeOfPlantsPlanted } = req.body;
    const pastureId = req.params.pastureId;

    const updatePastureDetails = {
        area,
        fertilizerUsed,
        feedingCapacity,
        assignedEmployee,
        typeOfPlantsPlanted
    };

    try {
        const updatedPastureDetails = await PastureDetail.findByIdAndUpdate(pastureId, updatePastureDetails, { new: true });

        if (!updatedPastureDetails) {
            return res.status(404).json({ error: "Pasture details not found" });
        }

        res.status(200).json({ message: "Pasture details updated successfully", updatedPastureDetails });
    } catch (error) {
        console.error("Error updating pasture details:", error);
        res.status(500).json({ error: "Failed to update pasture details" });
    }
});

router.route("/delete/:pastureId").delete(async (req, res) => {
    const pastureId = req.params.pastureId;

    try {
        const deletedPastureDetails = await PastureDetail.findByIdAndDelete(pastureId);

        if (!deletedPastureDetails) {
            return res.status(404).json({ error: "Pasture details not found" });
        }

        res.status(200).json({ message: "Pasture details deleted successfully", deletedPastureDetails });
    } catch (error) {
        console.error("Error deleting pasture details:", error);
        res.status(500).json({ error: "Failed to delete pasture details" });
    }
});

router.route("/get/:pastureId").get(async (req, res) => {
    const pastureId = req.params.pastureId;

    try {
        const foundPastureDetails = await PastureDetail.findById(pastureId);

        if (!foundPastureDetails) {
            return res.status(404).json({ error: "Pasture details not found" });
        }

        res.status(200).json(foundPastureDetails);
    } catch (error) {
        console.error("Error fetching pasture details:", error);
        res.status(500).json({ error: "Failed to fetch pasture details" });
    }
});

module.exports = router;
