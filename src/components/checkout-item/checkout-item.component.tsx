import "./checkout-item.styles.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearItems } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CartItem } from "../../store/cart/cart.type";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const CartItems = useSelector(selectCartItems);
  const clearItemsFromCart = () => dispatch(clearItems(CartItems, cartItem));
  const incrementItemInCart = () => dispatch(addItem(CartItems, cartItem));
  const decrementItemInCart = () => dispatch(removeItem(CartItems, cartItem));
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementItemInCart}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementItemInCart}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemsFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
