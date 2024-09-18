import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (productId, size) => {
    if (!size) {
      toast.error("Please Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size]++;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          totalCount += cartItems[items][size];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (productId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[productId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {
          let itemInfo = products.find((product) => product._id === items);
          totalAmount += cartItems[items][size] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
