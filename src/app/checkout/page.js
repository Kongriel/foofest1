"use client";
import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleInputBlur = () => {
    setState((prev) => ({ ...prev, focus: "" }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-4xl font-bebas text-bono-10 font-bold mb-8">Payment Information</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="scale-125 mb-8 md:mb-0">
          <Cards number={state.number} expiry={state.expiry} cvc={state.cvc} name={state.name} focused={state.focus} />
        </div>
        <form className="p-6 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input type="text" name="name" placeholder="Name" value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} className="w-full px-3 py-3 rounded-md bg-knap-10 text-bono-10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="number">
              Card Number
            </label>
            <input type="text" name="number" placeholder="Card Number" value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} className="w-full px-3 py-3 bg-knap-10 text-bono-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" inputMode="numeric" pattern="[0-9]*" />
          </div>
          <div className="flex justify-between mb-4">
            <div className="w-1/2 mr-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="expiry">
                Expiration (mm/yy)
              </label>
              <input type="text" name="expiry" placeholder="MM/YY" value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} className="w-full px-3 py-3 bg-knap-10 rounded-md text-bono-10 focus:outline-none focus:ring-2 focus:ring-blue-500" inputMode="numeric" pattern="[0-9]*" maxLength="4" />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="cvc">
                Security Code
              </label>
              <input type="text" name="cvc" placeholder="CVC" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} className="w-full px-3 py-3 rounded-md bg-knap-10 text-bono-10 focus:outline-none focus:ring-2 focus:ring-blue-500" inputMode="numeric" pattern="[0-9]*" maxLength="3" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
