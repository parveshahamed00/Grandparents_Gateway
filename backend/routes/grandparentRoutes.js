const express = require("express");
const router = express.Router();
const GrandParent = require("../model/GrandParent");

// @route   POST /api/grandparents/register
// @desc    Register a new grandparent
router.post("/signup", async (req, res) => {
  try {
    const { fullName, gender, age, phoneNumber, password } = req.body;

    if (!fullName || !gender || !age || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await GrandParent.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ message: "Phone number already registered" });
    }

    const newGrandParent = new GrandParent({
      fullName,
      gender,
      age,
      phoneNumber,
      password,
    });

    await newGrandParent.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error("Error registering grandparent:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/grandparents/login
// @desc    Login a grandparent
router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await GrandParent.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful",g_id: user.g_id });
  } catch (err) {
    console.error("Error logging in grandparent:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/profile/:g_id", async (req, res) => {
  try {
    const { g_id } = req.params;

    if (!g_id) {
      return res.status(400).json({ message: "g_id is required" });
    }

    const user = await GrandParent.findOne({ g_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile data
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      gender: user.gender,
      age: user.age,
      phoneNumber: user.phoneNumber,
      g_id: user.g_id
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
