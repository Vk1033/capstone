import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.type";
import { CategoryItem } from "../categories/category.types";

export type ToggleCartHidden = Action<CART_ACTION_TYPES.TOGGLE_HIDDEN>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;
export type CartAction = ToggleCartHidden | SetCartItems;

export const toggleCartHidden = withMatcher((): ToggleCartHidden => createAction(CART_ACTION_TYPES.TOGGLE_HIDDEN));
export const setCart = withMatcher(
  (newCartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
);

export const addItem = (cartItems: CartItem[], item: CategoryItem): SetCartItems => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    return setCart(
      cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  } else {
    return setCart([...cartItems, { ...item, quantity: 1 }]);
  }
};

export const removeItem = (cartItems: CartItem[], item: CartItem): SetCartItems => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (existingItem && existingItem.quantity === 1) {
    return setCart(cartItems.filter((cartItem) => cartItem.id !== item.id));
  }
  return setCart(
    cartItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem))
  );
};

export const clearItems = (cartItems: CartItem[], item: CartItem): SetCartItems => {
  return setCart(cartItems.filter((cartItem) => cartItem.id !== item.id));
};
