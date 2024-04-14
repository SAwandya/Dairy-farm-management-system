const router = require("express").Router();
const EffluentDetail = require("../models/effluentDetails");

// http://localhost:3000/effluentRoutes/add
router.route(" http://localhost:3000/effluentRoutes/add").post((req, res) => {
    const { date, grazingArea, wasteCollected, wasteType } = req.body;

    const newEffluentDetail = new EffluentDetail({
        date,
        grazingArea,
        wasteCollected,
        wasteType
    });

    newEffluentDetail.save()
        .then(result => {
            console.log("Effluent detail saved successfully:", result);
            res.status(201).json(result);
        })
        .catch(error => {
            console.error("Error saving effluent detail:", error);
            res.status(500).json({ error: "Failed to save effluent detail" });
        });
});

// http://localhost:8070/effluentDetails
router.route("/").get((req, res) => {
    EffluentDetail.find()
        .then(effluentDetails => {
            res.json(effluentDetails);
        })
        .catch(error => {
            console.error("Error retrieving effluent details:", error);
            res.status(500).json({ error: "Failed to retrieve effluent details" });
        });
});

// http://localhost:8070/effluentDetails/update/:effluentId
router.route("/update/:effluentId").put(async (req, res) => {
    const { date, grazingArea, wasteCollected, wasteType } = req.body;
    const effluentId = req.params.effluentId;

    const updateEffluentDetails = {
        date,
        grazingArea,
        wasteCollected,
        wasteType
    };

    try {
        const updatedEffluentDetails = await EffluentDetail.findByIdAndUpdate(effluentId, updateEffluentDetails, { new: true });

        if (!updatedEffluentDetails) {
            return res.status(404).json({ error: "Effluent details not found" });
        }

        res.status(200).json({ message: "Effluent details updated successfully", updatedEffluentDetails });
    } catch (error) {
        console.error("Error updating effluent details:", error);
        res.status(500).json({ error: "Failed to update effluent details" });
    }
});

// http://localhost:8070/effluentDetails/delete/:effluentId
router.route("/delete/:effluentId").delete(async (req, res) => {
    const effluentId = req.params.effluentId;

    try {
        const deletedEffluentDetails = await EffluentDetail.findByIdAndDelete(effluentId);

        if (!deletedEffluentDetails) {
            return res.status(404).json({ error: "Effluent details not found" });
        }

        res.status(200).json({ message: "Effluent details deleted successfully", deletedEffluentDetails });
    } catch (error) {
        console.error("Error deleting effluent details:", error);
        res.status(500).json({ error: "Failed to delete effluent details" });
    }
});

module.exports = router;
