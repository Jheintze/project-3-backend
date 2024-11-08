// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();
const cors = require("cors");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// const allowedOrigins = (
//   process.env.NODE_ENV === "production"
//     ? "https://nextleveltravel.netlify.app"
//     : "http://localhost:3000"
// ).trim();

//     console.log("Allowed Origins:", allowedOrigins);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests if origin matches allowedOrigins exactly
//       if (origin === allowedOrigins || origin === undefined) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Allow credentials (cookies, tokens, etc.)
//   })
// );
app.use(
  cors({
    origin: "https://nextleveltravel.netlify.app",
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  console.error(err); // Log the error details
  res.status(500).json({ message: "Internal server error", error: err });
});

app.options("*", cors());

console.log("Allowed FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("Current NODE_ENV:", process.env.NODE_ENV);

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

module.exports = app;


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
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     origin: "*"
//   })
// );
