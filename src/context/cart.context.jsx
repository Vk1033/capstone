import { createContext, useState } from "react";

const CartContext = createContext({ hidden: true, toggleHidden: () => {}, cartItems: [], addItem: () => {} });

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const toggleHidden = () => setHidden(!hidden);
  const addItem = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  return <CartContext.Provider value={{ hidden, toggleHidden, cartItems, addItem }}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
