import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useDateContext } from "./DateProvider.jsx";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { dateFunc } = useDateContext();
  const dateString1 = dateFunc(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(
    dateString1.split(" - ")[0]
  );
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
