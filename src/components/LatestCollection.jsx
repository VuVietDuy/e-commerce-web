import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [lastestProducts, setLastestProducts] = useState([]);

  useEffect(() => {
    setLastestProducts(products.slice(0, 10));
  }, []);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={""} />
        <p className="w-3.4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Create Full Stack E-commerce Website Using React JS | MERN Stack
          eCommerce Project with Stripe
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {lastestProducts.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
