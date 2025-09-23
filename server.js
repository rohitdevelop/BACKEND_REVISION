// import http from 'http';
// import cat from 'cat-me'

// const server = http.createServer((req, res) => {
//   console.log(cat());

//   if (req.url === '/about') {
//     res.end('hello about')
//   }
//   if (req.url === '/project') {
//     res.end('hello project');
//   }
//   if (req.url === '/') {
//     res.end('hello world')
//   }

// });

// server.listen(3000);

// const express = require("express");
// const morgan = require("morgan");
// const app = express();

// // Middleware
// app.use(morgan("dev")); //morgan hame ye batata h ki kon se request aai thi kab aai or vo shi h ya nhi (ye ek third part Middlewarehai)
// app.use((req, res, next) => {
//   console.log("Middleware running for:", req.url);
//   next(); // continue to the route
// });

// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index", { title: "Home Page" });
// });

// app.get("/about", (req, res) => {
//   res.send("hello about");
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

//se have 3 Middleware ware
//1. inbuild express costome Middleware
//2. custom Middleware
//3. third party Middleware
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const UserModel = require("./models/user");
require("dotenv").config();

// Middleware
app.use((req, res, next) => {
  console.log("middleware start", req.url);
  next();
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// Save form data to DB
app.post("/get-form-deta", async (req, res) => {
  try {
    console.log(req.body);

    const user = new UserModel(req.body);
    await user.save();

    res.send("✅ Data received & saved in MongoDB");
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error saving data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
