import { AnyAction } from "redux";
import { CartItem } from "./cart.type";
import { toggleCartHidden, setCart } from "./cart.action";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly cartTotal: number;
  readonly isCartOpen: boolean;
};

const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  cartTotal: 0,
  isCartOpen: false,
};

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (toggleCartHidden.match(action)) {
    return {
      ...state,
      isCartOpen: !state.isCartOpen,
    };
  }

  if (setCart.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
