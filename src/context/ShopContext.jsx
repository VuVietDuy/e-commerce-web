import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import fetcher from "../api/fetcher";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

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

    if (token) {
      try {
        fetcher.post("/api/carts", {
          itemId: productId,
          size,
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetcher.get("/api/products");
      setProducts(response.data.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCartItems = async () => {
    try {
      const response = await fetcher.get(`/api/carts`);
      setCartItems(response.data.cartData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getCartItems();
    }
  }, []);

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

    if (token) {
      try {
        await fetcher.put(`/api/carts`, {
          itemId: productId,
          size,
          quantity,
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
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
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
