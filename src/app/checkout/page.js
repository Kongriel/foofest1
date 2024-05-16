"use client";
import React from "react";
import Link from "next/link";

const Checkout = () => {
  return (
    <div className="min-h-screen text-bono-10 flex flex-col items-center justify-center bg-gray-50 py-10">
      <h1 className="text-4xl font-bold mb-6">Checkout</h1>
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {/* Add order summary details here */}
        <Link href="/">
          <button className="w-full p-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 mt-6">Confirm and Pay</button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
