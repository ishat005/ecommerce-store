import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Do not allow products with no inventory.
      if (product.stock <= 0) {
        return;
      }

      const existing = state.items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        // Don't allow cart quantity to exceed inventory.
        if (existing.quantity < product.stock) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) {
        return;
      }

      // Don't allow quantity to exceed available stock.
      if (item.quantity < item.stock) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;