const express = require("express");
const router = express.Router();
const CropRecommendationDetails = require("../models/CropRecommendationDetails.model");

// GET API endpoint to retrieve all data
router.get("/crop-recommendation-details/all", async (req, res) => {
    try {
        // Find all data
        const data = await CropRecommendationDetails.find();

        if (!data || data.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET API endpoint to retrieve data based on region and crop
router.get("/crop-recommendation-details", async (req, res) => {
    const { region, quatar } = req.query;

    try {
        // Find data based on region and crop
        const data = await CropRecommendationDetails.findOne({ Region: region, Quatar: quatar });

        if (!data) {
            return res.status(404).json({ error: "Data not found" });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
