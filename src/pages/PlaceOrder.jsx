import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets, products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import fetcher from "../api/fetcher";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const { cartItems, setCartItems, products, getCartAmount, delivery_fee } =
    useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await fetcher.post("/api/orders/place", orderData);
          if (response.data.success) {
            toast.success(response.data.message);
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-ful sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVRY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3 ">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="First name"
            type="text"
          />
          <input
            onChange={onChangeHandler}
            value={formData.lastName}
            name="lastName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Last name"
            type="text"
          />
        </div>

        <input
          onChange={onChangeHandler}
          value={formData.email}
          name="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Email address"
          type="email"
        />
        <input
          onChange={onChangeHandler}
          value={formData.street}
          name="street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Street"
          type="text"
        />

        <div className="flex gap-3 ">
          <input
            onChange={onChangeHandler}
            value={formData.city}
            name="city"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="City"
            type="text"
          />
          <input
            onChange={onChangeHandler}
            value={formData.state}
            name="state"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="State"
            type="text"
          />
        </div>
        <div className="flex gap-3 ">
          <input
            onChange={onChangeHandler}
            value={formData.zipcode}
            name="zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Zipcode"
            type="text"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            placeholder="Country"
            type="text"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          placeholder="Phone"
          type="text"
        />
      </div>

      {/* Right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" && "bg-green-400"
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" && "bg-green-400"
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" && "bg-green-400"
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black px-16 py-3 text-white text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
