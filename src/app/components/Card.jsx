import React, { useState } from "react";

function Card({ title, status, subtitle, price }) {
  const [textStrokeColor, setTextStrokeColor] = useState("#007bff");

  // Define outline style based on state
  const outlineStyle = {
    color: "transparent",
    fontWeight: "bold",
    WebkitTextStroke: `2px ${textStrokeColor}`, // Dynamic stroke color based on state
  };

  return (
    <div
      className="bg-knap-10 p-6 transition-all duration-200 ease-in-out hover:border-blue-500 focus:border-blue-500 hover:ring-2 focus:ring-2 hover:ring-blue-500 focus:ring-blue-500 focus:outline-none border-2 border-transparent rounded-xl shadow-xl max-w-sm mx-auto cursor-pointer group"
      onMouseEnter={() => setTextStrokeColor("black")} // Change to gray on hover
      onMouseLeave={() => setTextStrokeColor("#007bff")} // Revert to blue when not hovering
      onFocus={() => setTextStrokeColor("black")} // Change to gray on focus
      onBlur={() => setTextStrokeColor("#007bff")} // Revert to blue when focus is lost
      tabIndex="0" // Makes the card focusable and reachable via keyboard navigation
    >
      <div className="text-center">
        <h1 className="text-2xl mt-6 mb-10 font-bold font-bebas text-gray-600">{title}</h1>
        <h2 className="text-6xl mt-12 mb-4 font-bebas font-bold text-blue-800" style={outlineStyle}>
          FOO'24 <br /> ALL WEEK
        </h2>
        <p className="mt-2 font-semibold font-bebas text-black">{status} TICKET</p>
        <p className="text-sm mt-1 mb-6 font-montserrat text-gray-800">Billetten giver dig adgang til festivalpladsen og alle koncerterne på Foofest 2024.</p>
        <p className="text-4xl font-bold font-bebas text-black mt-12 group-hover:text-blue-500 group-focus:text-blue-500">{price} DKK</p>
      </div>
    </div>
  );
}

export default Card;
