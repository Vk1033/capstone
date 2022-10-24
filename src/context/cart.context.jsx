import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const CartContext = createContext({
  isCartOpen: false,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  TOGGLE_HIDDEN: "TOGGLE_HIDDEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  cartItems: [],
  cartTotal: 0,
  isCartOpen: false,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.TOGGLE_HIDDEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error("cartReducer");
  }
};

const CartProvider = ({ children }) => {
  const [{ cartItems, cartTotal, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (cartItems) => {
    const newCartTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems, cartTotal: newCartTotal }));
  };
  const toggleHidden = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_HIDDEN, !isCartOpen));
  };

  const addItem = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      updateCartItemsReducer(
        cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      updateCartItemsReducer([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem.quantity === 1) {
      updateCartItemsReducer(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
    updateCartItemsReducer(
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      )
    );
  };

  const clearItemFromCart = (item) => {
    updateCartItemsReducer(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  return (
    <CartContext.Provider
      value={{ isCartOpen, toggleHidden, cartItems, addItem, removeItem, clearItemFromCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
