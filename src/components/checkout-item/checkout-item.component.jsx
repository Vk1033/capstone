import "./checkout-item.styles.scss";
import React from "react";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItem, removeItem } = useContext(CartContext);
  const clearItem = () => clearItemFromCart(cartItem);
  const incrementItemInCart = () => addItem(cartItem);
  const decrementItemInCart = () => removeItem(cartItem);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementItemInCart}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementItemInCart}>&#10095;</div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
