import { createContext, useState, useEffect } from "react";

const CartContext = createContext({
  hidden: false,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    const cartTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    setCartTotal(cartTotal);
  }, [cartItems]);

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

  const removeItem = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem.quantity === 1) {
      return setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
    return setCartItems(
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      )
    );
  };

  const clearItemFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  return (
    <CartContext.Provider
      value={{ hidden, toggleHidden, cartItems, addItem, removeItem, clearItemFromCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
