import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Home() {
  const products = useSelector((state) => state.products.items);
  const featured = products.slice(0, 3);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Shop smarter, not harder
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
            Quality essentials for everyday life — electronics, footwear, home
            goods, and more, all in one place.
          </p>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            disableElevation
            size="large"
            sx={{ mt: 4 }}
          >
            Shop now
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Shop by category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="rounded-lg border border-slate-200 bg-white p-6 text-center font-medium text-slate-700 transition-colors hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Featured products
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            View all →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card className="flex flex-col overflow-hidden">
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                />
                <CardContent>
                  <Typography
                    variant="caption"
                    className="font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400"
                  >
                    {product.category}
                  </Typography>
                  <Typography variant="subtitle1" className="mt-1 text-slate-900 dark:text-white">
                    {product.name}
                  </Typography>
                  <Typography variant="h6" className="mt-2 text-slate-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}