import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your wishlist is empty</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Tap the heart on any product to save it here.</p>
        <Button component={Link} to="/products" variant="contained" disableElevation sx={{ mt: 4 }}>
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Your wishlist</h1>

      <div className="mt-6 flex flex-col gap-4">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 rounded-md object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">${item.price.toFixed(2)}</p>
            </div>

            <Button
              variant="outlined"
              onClick={() => dispatch(addToCart(item))}
            >
              Add to cart
            </Button>

            <IconButton
              onClick={() => dispatch(removeFromWishlist(item.id))}
              aria-label="remove from wishlist"
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}