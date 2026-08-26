import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688&auto=format&fit=crop",
      category: "Electronics",
      stock: 10,
    },
    {
      id: 2,
      name: "Running Shoes",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1662000329888-783a6954c2ea?q=80&w=764&auto=format&fit=crop",
      category: "Footwear",
      stock: 8,
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1707241358597-bafcc8a8e73d?q=80&w=1170&auto=format&fit=crop",
      category: "Home",
      stock: 5,
    },
    {
      id: 4,
      name: "Backpack",
      price: 34.5,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop",
      category: "Accessories",
      stock: 3,
    },
  ],

  status: "idle",
};

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    decreaseStock: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.items.find(
        (item) => item.id === id
      );

      if (!product) {
        return;
      }

      product.stock = Math.max(
        0,
        product.stock - quantity
      );
    },

    increaseStock: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.items.find(
        (item) => item.id === id
      );

      if (!product) {
        return;
      }

      product.stock += quantity;
    },
  },
});

export const {
  decreaseStock,
  increaseStock,
} = productsSlice.actions;

export default productsSlice.reducer;