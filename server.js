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
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/router/userrouter");

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views")); 
// Routes

// ✅ Setup static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

