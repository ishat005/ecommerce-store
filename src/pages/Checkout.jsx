import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { clearCart } from "../features/cart/cartSlice";
import { decreaseStock } from "../features/products/productsSlice";

export default function Checkout() {
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const products = useSelector(
    (state) => state.products.items
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] =
    useState("standard");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});

  const [stockError, setStockError] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shipping =
    deliveryMethod === "express" ? 99 : 0;

  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName =
        "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName =
        "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      newErrors.phone =
        "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address =
        "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state =
        "State is required";
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode =
        "PIN code is required";
    } else if (
      !/^[0-9]{6}$/.test(formData.pinCode)
    ) {
      newErrors.pinCode =
        "Enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
   * Check current inventory before placing
   * the order.
   */
  const validateStock = () => {
    for (const cartItem of cartItems) {
      const cartItemId = cartItem._id || cartItem.id;
      const currentProduct = products.find(
        (product) =>
          (product._id || product.id) === cartItemId
      );

      if (!currentProduct) {
        setStockError(
          `${cartItem.name} is no longer available.`
        );

        return false;
      }

      if (
        currentProduct.stock <
        cartItem.quantity
      ) {
        setStockError(
          `${cartItem.name} only has ${currentProduct.stock} item${
            currentProduct.stock === 1
              ? ""
              : "s"
          } left in stock. Please update your cart.`
        );

        return false;
      }
    }

    setStockError("");

    return true;
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    setStockError("");

    /*
     * Validate customer information first.
     */
    if (!validateForm()) {
      return;
    }

    /*
     * Validate inventory immediately before
     * creating the order.
     */
    if (!validateStock()) {
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    /*
     * Create order snapshot.
     */
    const order = {
      id: `ORD-${Date.now()}`,

      items: cartItems.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),

      subtotal,
      shipping,
      total,

      deliveryMethod,

      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
      },

      status: "Confirmed",

      createdAt: new Date().toISOString(),
    };

    try {
      /*
       * Decrease product inventory via backend API.
       */
      for (const item of cartItems) {
        await dispatch(
          decreaseStock({
            id: item._id || item.id,
            quantity: item.quantity,
          })
        ).unwrap();
      }

      /*
       * Clear cart after inventory has been
       * successfully validated and reduced on the backend.
       */
      dispatch(clearCart());

      /*
       * Go to confirmation page.
       */
      navigate("/order-success", {
        state: {
          order,
        },
      });
    } catch (error) {
      console.error("Failed to update stock:", error);
      setStockError("Failed to process stock update. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Your cart is empty
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Add some products before checking out.
        </p>

        <Button
          component={Link}
          to="/products"
          variant="contained"
          disableElevation
          sx={{ mt: 4 }}
        >
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Checkout
        </h1>

        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Complete your details to place your
          order.
        </p>
      </div>

      {/* Stock error */}
      {stockError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
          <p className="font-semibold">
            Stock unavailable
          </p>

          <p className="mt-1 text-sm">
            {stockError}
          </p>

          <Link
            to="/cart"
            className="mt-2 inline-block text-sm font-semibold underline"
          >
            Return to cart
          </Link>
        </div>
      )}

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">
          {/* Customer Information */}
          <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Customer information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={Boolean(
                  errors.firstName
                )}
                helperText={errors.firstName}
              />

              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={Boolean(
                  errors.lastName
                )}
                helperText={errors.lastName}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                inputProps={{
                  maxLength: 10,
                }}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />
            </div>
          </section>

          {/* Shipping Address */}
          <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Shipping address
            </h2>

            <div className="mt-5 space-y-4">
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={Boolean(errors.address)}
                helperText={errors.address}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />

                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  error={Boolean(errors.state)}
                  helperText={errors.state}
                />

                <TextField
                  fullWidth
                  label="PIN code"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: 6,
                  }}
                  error={Boolean(
                    errors.pinCode
                  )}
                  helperText={errors.pinCode}
                />
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <FormControl>
              <FormLabel>
                <span className="text-xl font-semibold text-slate-900 dark:text-white">
                  Delivery method
                </span>
              </FormLabel>

              <RadioGroup
                value={deliveryMethod}
                onChange={(event) =>
                  setDeliveryMethod(
                    event.target.value
                  )
                }
                className="mt-4"
              >
                <FormControlLabel
                  value="standard"
                  control={<Radio />}
                  label={
                    <div>
                      <p className="font-medium">
                        Standard Delivery
                      </p>

                      <p className="text-sm text-slate-500">
                        3–5 business days · Free
                      </p>
                    </div>
                  }
                />

                <FormControlLabel
                  value="express"
                  control={<Radio />}
                  label={
                    <div>
                      <p className="font-medium">
                        Express Delivery
                      </p>

                      <p className="text-sm text-slate-500">
                        1–2 business days · $99
                      </p>
                    </div>
                  }
                />
              </RadioGroup>
            </FormControl>
          </section>
        </div>

        {/* RIGHT */}
        <div>
          <section className="sticky top-6 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Order summary
            </h2>

            <div className="mt-5 space-y-4">
              {cartItems.map((item) => {
                const cartItemId = item._id || item.id;
                const currentProduct =
                  products.find(
                    (product) =>
                      (product._id || product.id) === cartItemId
                  );

                return (
                  <div
                    key={cartItemId}
                    className="flex gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Qty: {item.quantity}
                      </p>

                      {currentProduct && (
                        <p className="text-xs text-slate-400">
                          {currentProduct.stock}{" "}
                          available
                        </p>
                      )}
                    </div>

                    <p className="font-medium text-slate-900 dark:text-white">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-700">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>

                <span>
                  {shipping === 0
                    ? "Free"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-slate-900 dark:border-slate-700 dark:text-white">
                <span>Total</span>

                <span>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disableElevation
              sx={{ mt: 4 }}
            >
              Place order
            </Button>

            <Button
              component={Link}
              to="/cart"
              fullWidth
              variant="text"
              sx={{ mt: 1 }}
            >
              Back to cart
            </Button>
          </section>
        </div>
      </form>
    </div>
  );
}