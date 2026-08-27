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
      const productId = product._id || product.id;

      // Do not allow products with no inventory.
      if (product.stock <= 0) {
        return;
      }

      const existing = state.items.find(
        (item) => (item._id || item.id) === productId
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
      const targetId = action.payload;
      state.items = state.items.filter(
        (item) => (item._id || item.id) !== targetId
      );
    },

    incrementQuantity: (state, action) => {
      const targetId = action.payload;
      const item = state.items.find(
        (item) => (item._id || item.id) === targetId
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
      const targetId = action.payload;
      const item = state.items.find(
        (item) => (item._id || item.id) === targetId
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