import CART_ACTION_TYPES from "./cart.type";

const CART_INITIAL_STATE = {
  cartItems: [],
  cartTotal: 0,
  isCartOpen: false,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CART_ACTION_TYPES.TOGGLE_HIDDEN:
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      return state;
  }
};
