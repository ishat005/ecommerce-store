import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addToCart } from "../features/cart/cartSlice";

export default function Products() {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Products</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
            <CardContent className="flex-1">
              <Typography variant="subtitle1" fontWeight={600}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>
              <Typography variant="h6" className="mt-2">
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
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