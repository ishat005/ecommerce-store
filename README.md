# ShopEase — Full-Stack E-Commerce Platform

ShopEase is a full-stack e-commerce web application built with React, Redux Toolkit, Node.js, Express.js, and MongoDB Atlas.

The project focuses on building a reliable shopping workflow with **persistent product data, asynchronous state management, real-time inventory validation, and atomic stock updates**.

## 🚀 Live Demo

**[ShopEase — Live Application](https://ecommerce-shopease-platform.netlify.app/)**

> The application is currently under active development. Authentication, order history, and administrative inventory management are planned for upcoming versions.

---

## ✨ Features

### 🛍️ Product Catalog

* Products stored in MongoDB Atlas
* REST API for retrieving product data
* Dynamic product rendering in React
* Responsive ecommerce interface

### 🛒 Shopping Cart

* Add products to cart
* Remove products from cart
* Update cart state using Redux Toolkit
* Cart state synchronized with the application workflow

### 📦 Inventory Management

ShopEase includes backend inventory controls designed to prevent unreliable stock updates.

The backend uses MongoDB's atomic `$inc` operation when modifying inventory.

Current inventory endpoints include:

```text
GET  /api/products
POST /api/products/:id/stock
POST /api/products/:id/restock
```

Atomic updates help prevent race conditions and unintended negative inventory values when multiple stock operations occur.

### 🔄 Redux Toolkit & Async Workflows

The frontend uses Redux Toolkit and `createAsyncThunk` for asynchronous communication with the backend.

The application handles:

* API requests
* Loading states
* Successful responses
* API errors
* Inventory updates
* Checkout workflows

### 💳 Checkout

The checkout workflow validates product availability before completing the purchase.

The process is:

```text
Customer Checkout
       ↓
Validate Product ID
       ↓
Check Inventory
       ↓
Atomically Update Stock
       ↓
Successful Checkout
       ↓
Clear Cart
```

This approach keeps the frontend shopping experience connected to the actual inventory stored in MongoDB.

### 🎨 UI & UX

* Responsive layout
* Light and dark mode
* Material UI components
* Tailwind CSS utilities
* Accessible navigation and contrast
* Responsive ecommerce experience

---

## 🏗️ Architecture

```text
┌───────────────────────────────┐
│        React Frontend         │
│                               │
│ React + Redux Toolkit         │
│ Material UI + Tailwind CSS    │
└───────────────┬───────────────┘
                │
                │ REST API
                ▼
┌───────────────────────────────┐
│       Express.js Backend      │
│                               │
│ Product APIs                  │
│ Inventory Validation          │
│ Checkout Logic                │
└───────────────┬───────────────┘
                │
                │ Mongoose
                ▼
┌───────────────────────────────┐
│         MongoDB Atlas         │
│                               │
│ Products                      │
│ Inventory                     │
└───────────────────────────────┘
```

---

## 🔐 Inventory Safety

A key technical goal of ShopEase is maintaining reliable inventory during checkout.

Instead of relying only on frontend stock values, the backend validates inventory against the database before processing the operation.

MongoDB atomic operations are used to update stock safely.

For example:

```text
Initial Stock
     10
      ↓
Customer purchases 2
      ↓
Atomic database update
      ↓
Remaining Stock
      8
```

This reduces the possibility of two concurrent operations incorrectly overwriting inventory values.

---

## 🧰 Tech Stack

### Frontend

* React
* JavaScript
* Redux Toolkit
* React Router
* Material UI (MUI)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Netlify — Frontend
* Render — Backend
* MongoDB Atlas — Database

---

## 📁 Project Structure

The application follows a frontend/backend architecture:

```text
ShopEase/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── store/
│   │   └── ...
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🛠️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/ishat005/shopease.git
cd shopease
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

If the frontend uses an environment variable for the backend API:

```env
REACT_APP_API_URL=http://localhost:5000
```

Never commit `.env` files or database credentials to GitHub.

### 5. Start the backend

```bash
cd backend
npm start
```

### 6. Start the frontend

In another terminal:

```bash
cd frontend
npm start
```

The frontend and backend will run independently during local development.

---

## 🗺️ Roadmap

ShopEase is being developed incrementally.

### 🔐 User Authentication

Planned features:

* User registration
* Login
* Password hashing with bcrypt
* JWT authentication
* Protected routes
* User-specific orders

### 📋 Order Management

Planned features:

* MongoDB `Order` model
* Persistent completed orders
* Order history
* Order details
* Order status
* Order tracking

### 📊 Admin Dashboard

Planned administrative features:

* Inventory overview
* Low-stock alerts
* Product management
* Add/edit/delete products
* Restock controls
* Order management
* Order status updates

---

## 🎯 Project Goals

ShopEase is designed to demonstrate practical full-stack development rather than simply creating a frontend ecommerce interface.

The project demonstrates experience with:

* Component-based React development
* Redux Toolkit state management
* Asynchronous Redux workflows
* REST API development
* Express.js
* MongoDB database integration
* Mongoose
* Atomic database operations
* Inventory validation
* Error handling
* Responsive UI development
* Material UI
* Tailwind CSS
* Full-stack deployment

---

## 📌 Current Status

**Version:** `v1 — Core E-Commerce Workflow`

### Completed

* [x] React frontend
* [x] Product catalog
* [x] MongoDB integration
* [x] Express.js REST API
* [x] Redux Toolkit
* [x] Shopping cart
* [x] Checkout workflow
* [x] Inventory validation
* [x] Atomic stock updates
* [x] Light/dark mode
* [x] Responsive UI
* [x] Production deployment

### In Progress

* [ ] User authentication
* [ ] JWT authorization
* [ ] Order persistence
* [ ] Order history
* [ ] Order tracking
* [ ] Admin dashboard
* [ ] Product management
* [ ] Admin restocking interface

---

## 👩‍💻 Author

**Isha Thakur**

Full-Stack Web Developer

* Portfolio: https://isha-thakur.netlify.app/
* GitHub: https://github.com/ishat005

---

## 📄 License

This project is licensed under the MIT License.
