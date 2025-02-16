const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user/", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
