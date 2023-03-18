import { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    let updatedItems = [...state.items];

    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id
    );
    let existingItem = updatedItems[existingItemIndex];

    if (existingItem) {
      updatedItems[existingItemIndex] = {
        ...existingItem,
        amount: (existingItem.amount += action.item.amount),
      };
    } else {
      updatedItems.push(action.item);
    }

    return { items: updatedItems, totalAmount: updatedAmount };
  } else if (action.type === "REMOVE_ITEM") {
    let updatedItems = [...state.items];

    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );

    let updatedItem = updatedItems[updatedItemIndex];

    if (updatedItem.amount === 1) {
      updatedItems = updatedItems.filter((item) => item.id !== action.id);
    } else {
      updatedItems[updatedItemIndex] = {
        ...updatedItem,
        amount: updatedItem.amount - 1,
      };
    }

    const updatedAmount = state.totalAmount - updatedItem.price;

    return {
      items: updatedItems,
      totalAmount: updatedItems.length > 0 ? updatedAmount : 0,
    };
  } else {
    return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
