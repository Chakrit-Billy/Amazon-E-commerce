import React from "react";
import ReactDOM from "react-dom/client";
import Amazon from "./components/amazon.jsx";
import { DateProvider } from "./components/DateProvider.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckoutPage } from "./components/checkoutpage.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import { Orders } from "./components/orders.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DateProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Amazon />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </Router>
      </CartProvider>
    </DateProvider>
  </React.StrictMode>
);
