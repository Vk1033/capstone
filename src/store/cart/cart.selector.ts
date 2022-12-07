import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

const selectCart = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

export const selectCartHidden = createSelector([selectCart], (cart) => cart.isCartOpen);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
});

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.quantity, 0);
});
