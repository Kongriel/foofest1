"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import FollowButton from "./FollowButton";
import Knap from "./Knap";
import Image from "next/image";

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

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="flex justify-between rounded-xl bg-knap-10 items-center px-2 h-24 relative text-bono-10">
      {/* Welcome Text */}
      <div className="text-sm sm:text-lg text-wrap">Velkommen til FooFest '24</div>

      {/* Foofest Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" passHref>
          <Image src="/Foofest-logo-2.png" alt="Foofest Logo" width={100} height={100} />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <Knap className="hidden md:block" /> {/* Hide on tablet size */}
        </div>
        <FollowButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Navigation Menu */}
      <div className={`fixed top-0 right-0 z-20 bg-bono-10 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:w-10/12 w-full`} style={{ clipPath: "ellipse(70% 100% at 100% 50%)" }}>
        <div className="flex flex-col items-end justify-center h-full text-center pr-10">
          <Link href="/booking" passHref>
            <div onClick={closeMenu} className="mt-4 mb-2 text-taupe-10 text-4xl cursor-pointer">
              Billetter
            </div>
          </Link>
          <Link href="#" passHref>
            <div onClick={closeMenu} className="my-2 text-taupe-10 text-4xl cursor-pointer">
              Nyheder
            </div>
          </Link>
          <Link href="/bands" passHref>
            <div onClick={closeMenu} className="my-2 text-taupe-10 text-4xl cursor-pointer">
              Line-up
            </div>
          </Link>
          <Link href="/faq" passHref>
            <div onClick={closeMenu} className="my-2 text-taupe-10 text-4xl cursor-pointer">
              FAQ
            </div>
          </Link>
          <Link href="/Live" passHref>
            <div onClick={closeMenu} className="my-2 text-taupe-10 text-4xl cursor-pointer">
              Live Now
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
