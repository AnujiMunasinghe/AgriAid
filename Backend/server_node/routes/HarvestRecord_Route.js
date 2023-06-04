const express = require("express");
const router = express.Router();
const dataModel = require("../models/HarvestRecord_Model")
const dataModelCultivation = require("../models/Cultivation_Model")


//API-01
//save harvested record data
router.route("/record").post(async (req, res) => {
    try {
        const harvest_Record = new dataModel({
            farmer: req.body.farmer,
            crop: req.body.crop,
            start: req.body.start,
            harvested: req.body.harvested,
            quantity: req.body.quantity,
            quality: req.body.quality,
        });

        const response = await harvest_Record.save();

        if (response != null) {
            const cultivationId = req.body.cultivationId;

            if (cultivationId) {
                const cultivationRecord = await dataModelCultivation.findByIdAndUpdate(
                    cultivationId,
                    { status: false }
                );

                if (cultivationRecord) {
                    res.send('1');
                } else {
                    res.send('0');
                }
            } else {
                res.send('0');
            }
        } else {
            res.send('0');
        }
    } catch (error) {
        res.send('Error: ' + error);
    }
});


// API-02
// Get record list by farmer ID
router.get("/records/:farmerId", async (req, res) => {
    try {
        const farmerId = req.params.farmerId;

        // Basic validation
        if (!farmerId) {
            return res.status(400).json({ error: "Missing farmer ID" });
        }

        const records = await dataModel.find({ farmer: farmerId });

        res.json(records);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;