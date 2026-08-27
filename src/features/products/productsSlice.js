// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [
//     {
//       id: 1,
//       name: "Wireless Headphones",
//       price: 79.99,
//       image:
//         "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=688&auto=format&fit=crop",
//       category: "Electronics",
//       stock: 10,
//     },
//     {
//       id: 2,
//       name: "Running Shoes",
//       price: 59.99,
//       image:
//         "https://images.unsplash.com/photo-1662000329888-783a6954c2ea?q=80&w=764&auto=format&fit=crop",
//       category: "Footwear",
//       stock: 8,
//     },
//     {
//       id: 3,
//       name: "Coffee Maker",
//       price: 45.0,
//       image:
//         "https://images.unsplash.com/photo-1707241358597-bafcc8a8e73d?q=80&w=1170&auto=format&fit=crop",
//       category: "Home",
//       stock: 5,
//     },
//     {
//       id: 4,
//       name: "Backpack",
//       price: 34.5,
//       image:
//         "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=687&auto=format&fit=crop",
//       category: "Accessories",
//       stock: 3,
//     },
//   ],

//   status: "idle",
// };

// const productsSlice = createSlice({
//   name: "products",

//   initialState,

//   reducers: {
//     decreaseStock: (state, action) => {
//       const { id, quantity } = action.payload;

//       const product = state.items.find(
//         (item) => item.id === id
//       );

//       if (!product) {
//         return;
//       }

//       product.stock = Math.max(
//         0,
//         product.stock - quantity
//       );
//     },

//     increaseStock: (state, action) => {
//       const { id, quantity } = action.payload;

//       const product = state.items.find(
//         (item) => item.id === id
//       );

//       if (!product) {
//         return;
//       }

//       product.stock += quantity;
//     },
//   },
// });

// export const {
//   decreaseStock,
//   increaseStock,
// } = productsSlice.actions;

// export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api";

// createAsyncThunk handles the async fetch + auto-generates
// pending/fulfilled/rejected action types for us
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }
);

export const decreaseStock = createAsyncThunk(
  "products/decreaseStock",
  async ({ id, quantity }) => {
    const response = await fetch(`${API_URL}/products/${id}/stock`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to update stock");
    }
    return response.json(); // returns the updated product from MongoDB
  }
);

const initialState = {
  items: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(decreaseStock.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const updatedId = updatedProduct._id || updatedProduct.id;
        
        const index = state.items.findIndex(
          (item) => (item._id || item.id) === updatedId
        );
        
        if (index !== -1) {
          state.items[index] = updatedProduct;
        }
      });
  },
});

export default productsSlice.reducer;