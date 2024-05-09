"use client";

import React, { useState, useEffect } from "react";

function Hero() {
  const [bands, setBands] = useState([]);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 668);

  useEffect(() => {
    fetch("https://winter-frill-lemon.glitch.me/bands")
      .then((response) => response.json())
      .then((data) => setBands(data.slice(0, 17)))
      .catch((error) => setError(error.message));

    const handleResize = () => {
      setIsMobile(window.innerWidth < 668);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const firstThree = bands.slice(0, 3);
  const secondRow = isMobile ? bands.slice(3, 7) : bands.slice(3, 10);
  const thirdRow = isMobile ? bands.slice(8, 12) : bands.slice(10, 17);
  const fourthRow = isMobile ? bands.slice(12, 16) : [];

  return (
    <div className="">
      {error && <div className="text-red-500 text-center p-4">{error}</div>}
      <div className="flex flex-col items-center space-y-1 px-9">
        {/* First row */}
        <div className="flex justify-center items-center space-x-4">
          {firstThree.map((band) => (
            <div key={band.slug} className="group relative text-center">
              <a href={band.link} className="block w-36 h-36 lg:w-80 lg:h-80 md:w-56 md:h-56 overflow-hidden rounded-full mx-auto border-4 border-transparent border-white hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:-rotate-8">
                <img src="https://assets-global.website-files.com/63619567f09fcef371836573/65f33bf3c72c47fc55ebd701_Rag%27n%27Bone%20Man-min.jpg" alt={band.name} className="w-full h-full object-cover rounded-full group-hover:opacity-55" loading="eager" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white font-semibold text-sm md:text-xl">{band.name}</span>
                </div>
              </a>
              <div className="mt-1 md:hidden text-xs font-semibold">{band.name}</div>
            </div>
          ))}
        </div>
        {/* Other rows with conditional margin */}
        {[secondRow, thirdRow, fourthRow].map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center items-center space-x-3">
            {row.map((band, index) => (
              <div key={band.slug} className={`group text-xxs relative text-center ${index % 2 !== 0 ? "mt-[3em] hover:-rotate-9 transition-all duration-300 ease-in-out transform" : "hover:-rotate-8 transition-all duration-300 ease-in-out transform"}`}>
                <a href={band.link} className="block w-24 h-24 md:w-28 md:h-28 lg:w-40 lg:h-40 overflow-hidden rounded-full mx-auto border-4 border-transparent border-white hover:border-blue-400 transition-all duration-300 ease-in-out transform">
                  <img src="https://assets-global.website-files.com/63619567f09fcef371836573/65f33bf3c72c47fc55ebd701_Rag%27n%27Bone%20Man-min.jpg" alt={band.name} className="w-full h-full object-cover rounded-full group-hover:opacity-55" loading="eager" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white text-xxs md:text-lg">{band.name}</span>
                  </div>
                </a>
                <div className="mt-1 md:hidden text-xxs ">{band.name}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
