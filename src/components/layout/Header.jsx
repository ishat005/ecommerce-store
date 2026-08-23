import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to="/" className="text-xl font-bold text-slate-900">
                    ShopEase
                </Link>

                <nav className="hidden gap-6 text-sm font-medium text-slate-600 sm:flex">
                    <Link to="/products" className="hover:text-indigo-600">Products</Link>
                </nav>

                <div className="flex items-center gap-1">
                    <IconButton component={Link} to="/wishlist" aria-label="wishlist">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton component={Link} to="/cart" aria-label="cart">
                        <ShoppingCartOutlinedIcon />
                    </IconButton>
                </div>
            </div>
        </header>
    )
}