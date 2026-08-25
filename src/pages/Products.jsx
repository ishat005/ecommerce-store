import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const products = useSelector((state) => state.products.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const isWishlisted = (id) => wishlistItems.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    if (isWishlisted(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden">
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
                  color: "#334155", // always dark slate, regardless of theme mode
                  "&:hover": { bgcolor: "white" },
                }}
              >
                {isWishlisted(product.id) ? (
                  <FavoriteIcon className="text-red-500" fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>

              <Link to={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
              </Link>
            </div>

            <CardContent className="flex-1">
              <Typography
                variant="caption"
                className="font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
              >
                {product.category}
              </Typography>
              <Link to={`/products/${product.id}`} className="block hover:text-indigo-600">
                <Typography variant="subtitle1" className="mt-1">
                  {product.name}
                </Typography>
              </Link>
            <Typography variant="h6" className="mt-2 text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </Typography>
            </CardContent>

            <CardActions className="px-4 pb-4">
              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={() => dispatch(addToCart(product))}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}