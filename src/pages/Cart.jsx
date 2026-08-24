import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
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
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Looks like you haven't added anything yet.</p>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          className="mt-6"
        >
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Your cart</h1>

      <div className="mt-6 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 rounded-md object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center gap-2">
              <IconButton
                size="small"
                onClick={() => dispatch(decrementQuantity(item.id))}
                aria-label="decrease quantity"
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <span className="w-6 text-center">{item.quantity}</span>
              <IconButton
                size="small"
                onClick={() => dispatch(incrementQuantity(item.id))}
                aria-label="increase quantity"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </div>

            <p className="w-20 text-right font-semibold text-slate-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <IconButton
              onClick={() => dispatch(removeFromCart(item.id))}
              aria-label="remove item"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <p className="text-lg font-semibold text-slate-900">
          Total: ${total.toFixed(2)}
        </p>
        <Button component={Link} to="/checkout" variant="contained" size="large">
          Checkout
        </Button>
      </div>
    </div>
  );
}