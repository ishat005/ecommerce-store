import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";

import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

export default function Products() {
  const products = useSelector((state) => state.products.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const status = useSelector((state) => state.products.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category === selectedCategory
      )
    : products;

  const isWishlisted = (id) =>
    wishlistItems.some((item) => (item._id || item.id) === (id));

  const toggleWishlist = (product) => {
    const productId = product._id || product.id;
    if (isWishlisted(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {selectedCategory || "Products"}
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          {filteredProducts.length} items available
        </p>

        {selectedCategory && (
          <button
            onClick={() => setSearchParams({})}
            className="mt-2 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const productId = product._id || product.id;
          const outOfStock = product.stock === 0;
          const lowStock = product.stock > 0 && product.stock <= 3;

          return (
            <Card
              key={productId}
              className="flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative">
                <IconButton
                  aria-label="toggle wishlist"
                  onClick={() => toggleWishlist(product)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
                    bgcolor: "rgba(255,255,255,0.9)",
                    color: "#334155",
                    "&:hover": {
                      bgcolor: "white",
                    },
                  }}
                >
                  {isWishlisted(productId) ? (
                    <FavoriteIcon
                      className="text-red-500"
                      fontSize="small"
                    />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </IconButton>

                <Link to={`/products/${productId}`}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                </Link>
              </div>

              {/* Content */}
              <CardContent className="flex-1">
                <Typography
                  variant="caption"
                  className="font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
                >
                  {product.category}
                </Typography>

                <Link
                  to={`/products/${productId}`}
                  className="block hover:text-indigo-600"
                >
                  <Typography
                    variant="subtitle1"
                    className="mt-1"
                  >
                    {product.name}
                  </Typography>
                </Link>

                <Typography
                  variant="h6"
                  className="mt-2 text-slate-900 dark:text-white"
                >
                  ${product.price.toFixed(2)}
                </Typography>

                {/* Stock */}
                <div className="mt-3">
                  {outOfStock ? (
                    <span className="text-sm font-semibold text-red-600">
                      Out of stock
                    </span>
                  ) : lowStock ? (
                    <span className="text-sm font-semibold text-orange-600">
                      Only {product.stock} left in stock
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-green-600">
                      {product.stock} in stock
                    </span>
                  )}
                </div>
              </CardContent>

              {/* Actions */}
              <CardActions className="px-4 pb-4">
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  disabled={outOfStock}
                  onClick={() => dispatch(addToCart(product))}
                >
                  {outOfStock ? "Out of stock" : "Add to cart"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}