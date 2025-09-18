// server.js
import express from "express";

const app = express();
const PORT = 5000;

// Middleware (to parse JSON)
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello Backend!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
