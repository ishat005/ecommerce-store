import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from "@mui/icons-material";
import { useThemeMode } from "../../context/ThemeContext";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const cartCount = useSelector((state) => state.cart.items.length);
  const { mode, toggleMode } = useThemeMode();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="sm:hidden">
            <IconButton aria-label="open menu" onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </IconButton>
          </div>

          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            ShopEase
          </Link>
        </div>

        <nav className="hidden gap-8 text-sm font-medium text-slate-600 sm:flex">
          <Link to="/products" className="transition-colors hover:text-indigo-600">
            Products
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <IconButton onClick={toggleMode} aria-label="toggle theme">
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          <IconButton component={Link} to="/wishlist" aria-label="wishlist">
            <Badge badgeContent={wishlistCount} color="error">
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          
          <IconButton component={Link} to="/cart" aria-label="cart">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </div>
      </div>

      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="flex w-64 flex-col p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">ShopEase</span>
            <IconButton aria-label="close menu" onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <nav className="mt-6 flex flex-col gap-1 text-slate-700">
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
            >
              Products
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
            >
              Cart
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-3 py-2 transition-colors hover:bg-slate-100"
            >
              Wishlist
            </Link>
          </nav>
        </div>
      </Drawer>
    </header>
  );
}