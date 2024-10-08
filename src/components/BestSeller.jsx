import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestSellerProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestSellerProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3.4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Create Full Stack E-commerce Website Using React JS | MERN Stack
          eCommerce Project with Stripe
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem product={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
