import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleCartHidden } from "../../store/cart/cart.action";
import { selectCartItems, selectCartItemsCount } from "../../store/cart/cart.selector";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const toggleHidden = () => dispatch(toggleCartHidden());
  const itemCount = useSelector(selectCartItemsCount);
  return (
    <div className="cart-icon-container" onClick={toggleHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
