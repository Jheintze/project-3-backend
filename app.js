// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();
const cors = require("cors");


// Set the origin dynamically based on the environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? "https://nextleveltravel.netlify.app" // production URL
    : "http://localhost:3000"; // local development URL

app.use(
  cors({
    origin: allowedOrigins, // Allow the correct frontend URL
    credentials: true, // Allow credentials (cookies, tokens, etc.)
  })
);



// const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:3000"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       callback(null, true); // Temporarily allow all origins
//     },
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests from allowed origins or no origin (e.g., for tools like Postman)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

console.log("Allowed FRONTEND_URL:", process.env.FRONTEND_URL);

// app.use(
//     cors({
//          origin:process.env.FRONTEND_URL,
//       credentials: true,
      
//     })
//   );

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const planetRoutes = require("./routes/planet.routes");
app.use("/api", planetRoutes);

const flightRoutes = require("./routes/flights.routes");
app.use("/api", flightRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     origin: "*"
//   })
// );

module.exports = app;
