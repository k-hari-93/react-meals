import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [isBumpNeeded, setBumpNeeded] = useState(false);
  const cartContext = useContext(CartContext);
  const btnClasses = `${classes.button} ${isBumpNeeded && classes.bump}`;
  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setBumpNeeded(true);

    const timer = setTimeout(() => {
      setBumpNeeded(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  const cartItems = cartContext.items.reduce((currTotal, item) => {
    return currTotal + item.amount;
  }, 0);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
