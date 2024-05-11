"use client";
import React, { useState, useEffect } from "react";
import FollowButton from "./FollowButton";
import Knap from "./Knap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Effect to toggle blur class on body
  useEffect(() => {
    // Get the main content element by ID
    const mainContent = document.getElementById("main-content");

    if (isOpen) {
      mainContent.classList.add("blur");
    } else {
      mainContent.classList.remove("blur");
    }
  }, [isOpen]);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className=" text-bono-10 flex justify-end items-center px-2 mt-3 h-24 relative">
      {/* Hamburger Icon */}
      <div className="z-10">
        <Knap />
      </div>
      <div className="z-30">
        <FollowButton onClick={toggleMenu} />
      </div>

      {/* Navigation Menu */}
      <div className={`fixed top-0 right-0 z-20 bg-bono-10 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:w-10/12 w-full`} style={{ clipPath: "ellipse(70% 100% at 100% 50%)" }}>
        <div className="flex flex-col items-end justify-center h-full text-right pr-10">
          <a href="#" className="mt-4 mb-2 text-taupe-10  text-3xl">
            Billetter
          </a>
          <a href="#" className="my-2 text-taupe-10  text-3xl">
            Nyheder
          </a>
          <a href="/bands" className="my-2 text-taupe-10  text-3xl">
            Line-up
          </a>
          <a href="#" className="my-2 text-taupe-10  text-3xl">
            FAQ
          </a>
          <a href="#" className="my-2 text-taupe-10  text-3xl">
            Experience
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
