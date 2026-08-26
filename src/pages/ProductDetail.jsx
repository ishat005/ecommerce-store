import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";

import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find(
      (item) => item.id === Number(id)
    )
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Product not found
        </h1>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          disableElevation
          sx={{ mt: 4 }}
        >
          Back to products
        </Button>
      </div>
    );
  }

  const toggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-lg object-cover"
        />

        {/* Product information */}
        <div>
          <Link
            to="/products"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {product.category}
          </Link>

          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>

          {/* Stock status */}
          {product.stock === 0 ? (
            <p className="mt-3 font-medium text-red-600">
              Out of stock
            </p>
          ) : product.stock <= 3 ? (
            <p className="mt-3 font-medium text-orange-600">
              Only {product.stock} left!
            </p>
          ) : (
            <p className="mt-3 font-medium text-green-600">
              In stock
            </p>
          )}

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            A great {product.category.toLowerCase()} pick —
            quality materials, reliable performance, and a
            design that fits easily into daily use.
          </p>

          {/* Actions */}
          <div className="mt-8 flex items-center gap-3">
            <Button
              variant="contained"
              disableElevation
              size="large"
              disabled={product.stock === 0}
              onClick={() => dispatch(addToCart(product))}
            >
              {product.stock === 0
                ? "Out of stock"
                : "Add to cart"}
            </Button>

            <IconButton
              onClick={toggleWishlist}
              aria-label="toggle wishlist"
              sx={{ color: "#334155" }}
              className="dark:!text-white"
            >
              {isWishlisted ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}