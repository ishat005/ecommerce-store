import { useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Hamburger button - mobile only */}
        <IconButton
          className="sm:hidden"
          aria-label="open menu"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Link to="/" className="text-xl font-bold text-slate-900">
          ShopEase
        </Link>

        {/* Layout is the layer of Header and Footer that would be wrapped around the content */}
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

      {/* Mobile slide-out drawer */}
      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <div className="flex w-64 flex-col p-4">
          <IconButton
            aria-label="close menu"
            className="self-end"
            onClick={() => setMenuOpen(false)}
          >
            <CloseIcon />
          </IconButton>

          <nav className="mt-4 flex flex-col gap-4 text-slate-700">
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>
          </nav>
        </div>
      </Drawer>
    </header>
  );
}