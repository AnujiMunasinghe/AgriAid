const express = require("express");
const router = express.Router();
const dataModel = require("../models/Cultivation_Model")

//API-01
//save cultivation
router.route("/addCultivation").post((req, res) => {

    const mongoDocument = new dataModel({
        farmer: req.body.farmer,
        crop: req.body.crop,
        begin: req.body.begin,
        end: req.body.end,
        status: true
    })

    const response = mongoDocument.save()
    response != null ?
        res.send('1') : res.send('0')
})


//API-02
//Get cultivated data
// router.route("/getCultivation").post( async(req, res) => { 
//     try {

//         const crops = await dataModel.find({farmer:req.body.farmer})

//         if(crops != null) {
//             res.json(crops)
//         }

//     }

//     catch (error) {
//         res.send('Error: ' +error)
//     }
// })


router.route("/getCultivation").post(async (req, res) => {
    try {
        const crops = await dataModel.find({ farmer: req.body.farmer, status: true });

        if (crops != null) {
            res.json(crops);
        }
    } catch (error) {
        res.send('Error: ' + error);
    }
});


//API-03
//Remove cultivation
router.route("/deleteCultivation").post(async (req, res) => {

    try {

        const remove = await dataModel.deleteOne({ farmer: req.body.farmer, crop: req.body.crop })

        if (remove.deletedCount === 1) {
            res.status(200).json({ message: "Deleted" });
        }

        else {
            res.status(404).json({ message: "Cannot be deleted" });
        }

    }

    catch (error) {
        res.send('Error: ' + error)
    }
})

//API-04
//Get needed crop want farmer
router.route("/getDate").post(async (req, res) => {
    try {
        const { farmer, crop, id } = req.body;

        let query = { farmer, crop };

        if (id) {
            query._id = id;
        }

        const data = await dataModel.findOne(query);

        if (data != null) {
            res.send(data.begin);
        } else {
            res.status(404).json({ message: "System error" });
        }
    } catch (error) {
        res.send("Error: " + error);
    }
});


module.exports = router