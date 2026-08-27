const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

/*
 * GET /api/products
 *
 * Return all products.
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: 1,
    });

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});

/*
 * GET /api/products/:id
 *
 * Return one product.
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
});

/*
 * PATCH /api/products/:id/stock
 *
 * Decrease product stock.
 */
router.patch("/:id/stock", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Insufficient stock available",
      });
    }

    product.stock -= quantity;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error("Update stock error:", error);

    res.status(500).json({
      message: "Failed to update stock",
    });
  }
});

/*
 * PATCH /api/products/:id/restock
 *
 * Increase product stock.
 */
router.patch("/:id/restock", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantityToAdd } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    // $inc increases the stock field by the given number
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $inc: { stock: quantityToAdd } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Restock error:", error);
    res.status(500).json({ message: "Failed to restock product" });
  }
});

module.exports = router;