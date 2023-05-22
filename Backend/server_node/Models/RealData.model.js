const mongoose = require("mongoose");

const realDataSchema = new mongoose.Schema({ 
    Region: {
        type: String,
        required: true,
    },
    Crop: {
        type: String,
        required: true,
    },
    Demand: {
        type: String,
        required: true,
    },
    Supply: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("RealCropDetails", realDataSchema);