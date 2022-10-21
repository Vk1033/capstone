import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import React from "react";

const CartIcon = () => {
    const { toggleHidden } = useContext(CartContext);
  return (
    <div className="cart-icon-container" onClick={toggleHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
