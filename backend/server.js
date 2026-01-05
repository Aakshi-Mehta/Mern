// ================= LOAD ENV FIRST =================
require("dotenv").config({ path: "./config/config.env" });

const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// ================= ERROR HANDLING =================
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

// ================= CONNECT DB =================
connectDatabase();

// ================= CLOUDINARY =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= START SERVER =================
// ✅ THIS LINE WAS MISSING
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ================= PROMISE HANDLING =================
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("Shutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
