import "./product-card.styles.scss";
import React from "react";
import Button from "../button/button.component";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItem } = useContext(CartContext);
  
  const addItemToCart = () => {
    addItem(product);
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addItemToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
