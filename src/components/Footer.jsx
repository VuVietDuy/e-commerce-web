import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" />
          <p className="text-sm text-gray-600 w-full md:w-2/3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            tristique velit. Donec euismod nulla id enim commodo, id pulvinar
            dolor congue. Sed finibus, nunc vitae pulvinar malesuada, justo
            ipsum consectetur neque, vel dignissim erat arcu in velit. Aliquam
            erat volutpat.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+84-123-456-789</li>
            <li>contact@forevery.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className=" py-5 text-sm text-center">Copyright 2024@ vuvietduy</p>
      </div>
    </div>
  );
};

export default Footer;
