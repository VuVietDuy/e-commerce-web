import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import fetcher from "../api/fetcher";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await fetcher.post("/api/users/register", {
          name,
          email,
          password,
        });
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("");
        console.log(response);
      } else {
        const response = await fetcher.post("/api/users/login", {
          email,
          password,
        });
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          className="w-full px-3 py-4 border border-gray-800"
          placeholder="Name"
        />
      )}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        className="w-full px-3 py-4 border border-gray-800"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        name="password"
        className="w-full px-3 py-4 border border-gray-800"
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button type="submit" className="bg-black text-white text-sm px-8 py-3">
        {currentState}
      </button>
    </form>
  );
};

export default Login;
