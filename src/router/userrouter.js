const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Show form
router.get("/", (req, res) => {
  res.render("index");   
});

// Handle form submission
router.post("/submit", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Prevent duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("index", { error: "Email already exists!" });
    }

    // Save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.render("success", { user: newUser });
  } catch (error) {
    console.error("Error saving user:", error);
    res.render("index", { error: "Something went wrong, try again!" });
  }
});

module.exports = router;
