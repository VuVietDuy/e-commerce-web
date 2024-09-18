import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "./RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProduct = async () => {
    products.map((item) => {
      if (item._id === productId) {
        console.log(item);
        setProduct(item);
        setImage(item.image[0]);
        return;
      }
    });
  };

  useState(() => {
    fetchProduct();
  }, [productId]);
  return product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-3">
            {product.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt=""
                className="w-[24%] sm:w-full object-cover flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" />
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 " />
            <img src={assets.star_icon} className="w-3 " />
            <img src={assets.star_icon} className="w-3 " />
            <img src={assets.star_icon} className="w-3 " />
            <img src={assets.star_dull_icon} className="w-3 " />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 font-medium text-3xl">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`font-medium border py-2 px-4 bg-gray-100 ${
                    item === size && "border-orange-500 bg-gray-50"
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(product._id, size)}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry, Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry . Lorem Ipsum is simply dummy text
            of the printing and typesetting industry
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry
          </p>
        </div>
      </div>

      {/* display related product */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  ) : null;
};

export default Product;
