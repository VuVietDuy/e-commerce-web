import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${product._id}`}
    >
      <div className="overflow-hidden">
        <img
          src={product.image[0]}
          className="hover:scale-110 transition ease-in-out"
          alt=""
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{product.name}</p>
      <p className="text-sm font-semibold">
        {currency} {product.price}
      </p>
    </Link>
  );
};

export default ProductItem;
