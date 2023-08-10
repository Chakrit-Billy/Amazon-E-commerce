import React from "react";
import ReactDOM from "react-dom/client";
import Amazon from "./components/amazon.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckoutPage } from "./components/checkoutpage.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Amazon />} />
        <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
