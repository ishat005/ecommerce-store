const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688&auto=format&fit=crop",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "Running Shoes",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1662000329888-783a6954c2ea?q=80&w=764&auto=format&fit=crop",
    category: "Footwear",
    stock: 8,
  },
  {
    name: "Coffee Maker",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1707241358597-bafcc8a8e73d?q=80&w=1170&auto=format&fit=crop",
    category: "Home",
    stock: 5,
  },
  {
    name: "Backpack",
    price: 34.5,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop",
    category: "Accessories",
    stock: 3,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    await Product.deleteMany({});

    await Product.insertMany(products);

    console.log(
      `${products.length} products inserted successfully`
    );

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();