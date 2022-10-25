import { createAction } from "../../utils/reducer/reducer.utils";
import CART_ACTION_TYPES from "./cart.type";

export const toggleCartHidden = () => createAction(CART_ACTION_TYPES.TOGGLE_HIDDEN);

export const addItem = (cartItems, item) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    return createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  } else {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, [...cartItems, { ...item, quantity: 1 }]);
  }
};

export const removeItem = (cartItems, item) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem.quantity === 1) {
    return createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      cartItems.filter((cartItem) => cartItem.id !== item.id)
    );
  }
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    cartItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem))
  );
};

export const clearItems = (cartItems, item) => {
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    cartItems.filter((cartItem) => cartItem.id !== item.id)
  );
};
