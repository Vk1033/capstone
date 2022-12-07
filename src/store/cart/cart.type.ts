import { CategoryItem } from "../categories/category.types";
export enum CART_ACTION_TYPES {
  TOGGLE_HIDDEN = "cart/TOGGLE_HIDDEN",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
}

export type CartItem = CategoryItem & {
  quantity: number;
};
