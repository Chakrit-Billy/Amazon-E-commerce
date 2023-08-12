import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState([
    "Tuesday, June 21",
  ]);
  const [shipPing, setShipPing] = useState(["FREE Shipping"]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        selectedQuantity,
        setSelectedQuantity,
        shipPing,
        setShipPing,
      }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};
