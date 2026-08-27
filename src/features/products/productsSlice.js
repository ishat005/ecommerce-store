import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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