const express = require("express");
const router = express.Router();
const RealCropDetails = require("../models/RealCropDetails.model"); // Assuming the model file is named realData.js


// GET API endpoint to retrieve all data
router.get("/real-data/all", async (req, res) => {
    try {
      // Find all data
      const data = await RealCropDetails.find();
  
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
router.get("/real-data", async (req, res) => {
    const { region, crop } = req.query;

    try {
        // Find data based on region and crop
        const data = await RealCropDetails.findOne({ Region: region, Crop: crop });

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
