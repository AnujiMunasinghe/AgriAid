const { v4: uuidv4 } = require('uuid');
const dataModel = require('../models/users.model');

exports.registerUser = async (req, res) => {
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
        const idSuffix = uuidv4().split("-").join("").substring(0, 6); // Generate a unique ID
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
};

exports.getUserByEmail = async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await dataModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
  
      res.status(200).json({ status: "success", data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  };