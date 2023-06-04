const mongoose = require("mongoose");

const cartSchema = {
    farmer: String,
    crop: String,
    begin: Date,
    end: Date,
    status: Boolean
}

const mongoCollection = mongoose.model("Cultivation", cartSchema)

module.exports = mongoCollection;