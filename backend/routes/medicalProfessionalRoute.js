const express = require('express');
const router = express.Router();
const Admin = require("../model/MedicalProfessional");


router.post("/medical-signup", async (req, res) => {
  try {
    const { fullName, specialization, hospital, phoneNumber, password } = req.body;

    // Validate required fields
    if (!fullName || !specialization || !hospital || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if phone number is already registered
    const existingUser = await Admin.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already registered" });
    }

    // Create a new medical professional
    const newAdmin = new Admin({
      fullName,
      specialization,
      hospital,
      phoneNumber,
      password,
    });

    // Save the new medical professional to the database
    await newAdmin.save();

    // Return success response
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Error registering medical professional:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
