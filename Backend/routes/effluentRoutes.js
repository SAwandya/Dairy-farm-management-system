const router = require("express").Router();
const EffluentDetail = require("../models/effluentDetails");

// Add a new effluent detail
router.route("/add").post((req, res) => {
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

// Get all effluent details
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

// Get waste type counts
router.route("/count-waste-types").get(async (req, res) => {
    try {
        const wasteTypeCounts = await EffluentDetail.aggregate([
            { $group: { _id: "$wasteType", totalAmount: { $sum: "$wasteCollected" } } }
        ]);

        // Map the waste types to specific categories
        const categorizedCounts = {
            livestockManure: 0,
            other: 0,
            discardedProduction: 0,
            weeds: 0
        };

        wasteTypeCounts.forEach(typeCount => {
            switch (typeCount._id) {
                case 'livestockManure':
                    categorizedCounts.livestockManure = typeCount.totalAmount;
                    break;
                case 'other':
                    categorizedCounts.other = typeCount.totalAmount;
                    break;
                case 'discardedProduction':
                    categorizedCounts.discardedProduction = typeCount.totalAmount;
                    break;
                case 'weeds':
                    categorizedCounts.weeds = typeCount.totalAmount;
                    break;
                default:
                    break;
            }
        });

        res.json(categorizedCounts);
    } catch (error) {
        console.error("Error retrieving waste type counts:", error);
        res.status(500).json({ error: "Failed to retrieve waste type counts" });
    }
});

// Update an effluent detail
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

// Delete an effluent detail
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
