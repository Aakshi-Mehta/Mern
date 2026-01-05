const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// ================= LOAD ENV (SAFE) =================
require("dotenv").config({ path: "./config/config.env" });

// ================= CORS (CRITICAL FIX) =================
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-qwzcs4zo5-aakshi-mehtas-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ================= BODY PARSERS =================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(fileUpload());

// ================= ROUTES =================
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// ================= ERROR MIDDLEWARE =================
app.use(errorMiddleware);

module.exports = app;

