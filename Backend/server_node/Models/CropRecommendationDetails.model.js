const mongoose = require("mongoose");

const cropRecommendationSchema = new mongoose.Schema({
  Region: {
    type: String,
    required: true,
  },
  Quatar: {
    type: String,
    required: true,
  },
  Crops: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("CropRecommendationDetails", cropRecommendationSchema);
