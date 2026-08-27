const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/*
 * Health check
 */
app.get("/", (req, res) => {
  res.json({
    message: "ShopEase API is running",
  });
});

/*
 * Product routes
 */
app.use("/api/products", productRoutes);

/*
 * MongoDB connection
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error
    );

    process.exit(1);
  });