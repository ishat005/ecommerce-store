import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your cart is empty
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Looks like you haven't added anything yet.
        </p>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          disableElevation
          sx={{ mt: 4 }}
        >
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Your cart
      </h1>

      <div className="mt-6 flex flex-col gap-4">
        {cartItems.map((item) => {
          const itemId = item._id || item.id;

          return (
            <div
              key={itemId}
              className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover"
              />

              {/* Product info */}
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">
                  {item.name}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  ${item.price.toFixed(2)}
                </p>

                {/* Inventory information */}
                {item.stock === 0 ? (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    Out of stock
                  </p>
                ) : item.quantity >= item.stock ? (
                  <p className="mt-1 text-xs font-medium text-orange-600">
                    Maximum available quantity
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.stock} available
                  </p>
                )}
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <IconButton
                  size="small"
                  onClick={() =>
                    dispatch(decrementQuantity(itemId))
                  }
                  disabled={item.quantity <= 1}
                  aria-label="decrease quantity"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                <span className="w-6 text-center text-slate-900 dark:text-white">
                  {item.quantity}
                </span>

                <IconButton
                  size="small"
                  onClick={() =>
                    dispatch(incrementQuantity(itemId))
                  }
                  disabled={item.quantity >= item.stock}
                  aria-label="increase quantity"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </div>

              {/* Item total */}
              <p className="w-20 text-right font-semibold text-slate-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Remove */}
              <IconButton
                onClick={() =>
                  dispatch(removeFromCart(itemId))
                }
                aria-label="remove item"
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </div>
          );
        })}
      </div>

      {/* Cart summary */}
      <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">
          Total: ${total.toFixed(2)}
        </p>

        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          disableElevation
          size="large"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}