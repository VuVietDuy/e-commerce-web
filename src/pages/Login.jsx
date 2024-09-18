import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("object");
    console.log(e);
  };
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
          type="text"
          name="name"
          className="w-full px-3 py-4 border border-gray-800"
          placeholder="Name"
        />
      )}
      <input
        type="email"
        name="email"
        className="w-full px-3 py-4 border border-gray-800"
        placeholder="Email"
      />
      <input
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
