import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`${API_URL}/orders/${orderId}`);
        if (!response.ok) {
          throw new Error("Order not found");
        }
        const data = await response.json();
        setOrder(data);
        setStatus("succeeded");
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    }

    fetchOrder();
  }, [orderId]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
        <CircularProgress />
      </div>
    );
  }

  if (status === "failed" || !order) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Order not found
        </h1>
        <Button component={Link} to="/products" variant="contained" disableElevation sx={{ mt: 4 }}>
          Continue shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600 dark:bg-green-900/30 dark:text-green-400">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
          Order placed successfully!
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Thank you for your purchase.
        </p>

        <div className="mt-8 rounded-lg bg-slate-50 p-6 text-left dark:bg-slate-900">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Order number</span>
            <span className="font-semibold text-slate-900 dark:text-white">{order._id}</span>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Status</span>
            <span className="font-semibold text-green-600 dark:text-green-400">{order.status}</span>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-slate-500 dark:text-slate-400">Delivery</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {order.deliveryMethod === "express" ? "Express" : "Standard"}
            </span>
          </div>

          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
            <span className="font-semibold text-slate-900 dark:text-white">Total</span>
            <span className="font-bold text-slate-900 dark:text-white">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button component={Link} to="/products" variant="contained" disableElevation>
            Continue shopping
          </Button>
          <Button component={Link} to="/" variant="outlined">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}