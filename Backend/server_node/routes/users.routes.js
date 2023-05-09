const express = require("express");
const router = express.Router();
const dataModel = require("../models/users.model")
const { v4: uuidv4 } = require('uuid');

router.route("/register").post(async (req, res) => {
    try {
        const { name, designation, workplace, email, password, role, visible } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ status: "error", message: "Missing required fields" });
        }

        const existingUser = await dataModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ status: "error", message: "User already exists" });
        }

        const idPrefix = role.toUpperCase(); // Prefix the role in uppercase
        const idSuffix = uuidv4().split("-").join("").substring(0, 4); // Generate a unique ID
        const id = `${idPrefix}_${idSuffix}`; // Combine the prefix and suffix to form the ID

        const newUser = new dataModel({
            id,
            name,
            designation,
            workplace,
            email,
            password,
            role,
            rating: 0,
            status: visible,
        });

        const response = await newUser.save();

        if (response) {
            return res.status(201).json({ status: "success", message: "User registered successfully" });
        }

        throw new Error("Failed to save user");
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

//API-02
//check user's email and password to login process
router.route("/login").post(async (req, res) => {
    try {
        const email = req.body.email
        const user = await dataModel.findOne({ email: email, status: 'show' })

        if (user != null) {
            if (user.password == req.body.password) {
                res.send([user.role, user.id, user.name, user.email])
            }

            else {
                res.send('0')
            }

        }

        else {
            res.send('2')
        }
    }

    catch (error) {
        res.send('Error: ' + error)
    }
})


//Crop advisory
router.route("/advisiory").get(async (req, res) => {

    try {
        const professionals = await dataModel.find({ role: 'Professional', status: 'show' }, { password: 0, email: 0, workplace: 0 })

        if (professionals != null) {
            res.send(professionals)
        }

        else {
            res.send('Prefessionals cannot be found..!')
        }
    }

    catch {

    }
})

//Get Crop advisior requests

router.route("/adminRequests").get(async (req, res) => {

    try {
        const professionals = await dataModel.find({ role: 'Professional', status: 'hide' }, { password: 0, email: 0, _id: 0, role: 0, rating: 0, status: 0 })

        if (professionals != null) {
            res.send(professionals)
        }

        else {
            res.send('Prefessionals cannot be found..!')
        }
    }

    catch {

    }
})


//Aprove Agricultural professional requests
router.route("/confirmRequest").put(async (req, res) => {
    console.log('Confirm Works')
    const id = req.body.id
    const status = req.body.status

    try {
        const updated = await dataModel.updateOne({ id: id }, { $set: { status: status } })

        if (updated.modifiedCount === 1) {
            res.status(200).json({ message: `Updated the document with id ${id}` });
        }

        else {
            res.status(404).json({ message: `Could not find document with id ${id}` });
        }
    }

    catch (err) {
        console.log(err)
    }
})


//Delete an user
router.route("/removeUser").post(async (req, res) => {
    const id = req.body.id

    try {
        const result = await dataModel.deleteOne({ id: id })

        if (result.deletedCount === 1) {
            res.status(200).json({ message: `Deleted the document with id ${id}` });
        }

        else {
            res.status(404).json({ message: `Could not find document with id ${id}` });
        }
    }

    catch (err) {
        console.log(err)
    }
})


//Accepted users
router.route("/acceptedUsers").post(async (req, res) => {
    const role = req.body.type;
    const status = req.body.status

    try {
        const professionals = await dataModel.find({ role: role, status: status }, { password: 0, email: 0, _id: 0, role: 0, rating: 0, status: 0 })

        if (professionals != null) {
            res.send(professionals)
        }

        else {
            res.send('Prefessionals cannot be found..!')
        }
    }

    catch {

    }
})
module.exports = router;