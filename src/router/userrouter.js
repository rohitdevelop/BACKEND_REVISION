const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Show form
router.get("/", (req, res) => {
  res.render("index");
});

// Handle form submission (Create)
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

    res.redirect("/user-deta");
  } catch (error) {
    console.error("Error saving user:", error);
    res.render("index", { error: "Something went wrong, try again!" });
  }
});

// Read all users
router.get("/user-deta", async (req, res) => {
  const users = await User.find();
  res.render("deta", { users });
});

// Show update form
router.get("/edit/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("edit", { user });
});

// Handle update (Update)
router.post("/edit/:id", async (req, res) => {
  const { name, email } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email });
  res.redirect("/user-deta");
});

// Delete user (Delete)
router.get("/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/user-deta");
});

module.exports = router;
