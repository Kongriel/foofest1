"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FollowButton from "./FollowButton";
import Knap from "./Knap";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Effect to toggle blur class on body
  useEffect(() => {
    const mainContent = document.getElementById("main-content");

    if (isOpen) {
      mainContent.classList.add("blur");
    } else {
      mainContent.classList.remove("blur");
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  // Close navbar when clicking outside or pressing Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navRef, hamburgerRef]);

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between rounded-xl bg-knap-10 items-center px-2 h-16 sm:h-20 md:h-24 z-50 text-bono-10">
      {/* Welcome Text */}
      <div className="text-xs sm:text-sm md:text-lg text-wrap">Velkommen til FooFest '24</div>

      {/* Foofest Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" passHref>
          <Image src="/Foofest-logo-2.png" alt="Foofest Logo" width={50} height={50} className="sm:w-20 sm:h-20 md:w-24 md:h-24" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="flex items-center -mr-6 space-x-3">
        <div className="hidden md:block mr-6">
          <Knap className="hidden md:block" /> {/* Hide on tablet size */}
        </div>
        <div ref={hamburgerRef}>
          <FollowButton isOpen={isOpen} toggleMenu={toggleMenu} tabIndex={0} role="Open-menu" aria-label="Menu" />
        </div>
      </div>

      {/* Navigation Menu */}
      <div ref={navRef} className={`fixed top-0 right-0 z-20 bg-bono-10 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} md:w-10/12 w-full`} style={{ clipPath: "ellipse(70% 100% at 100% 50%)" }}>
        <div className="flex flex-col items-end justify-center h-full text-center pr-10">
          <Link href="/booking" passHref>
            <div className="mt-4 mb-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="Booking" onClick={closeMenu}>
              Billetter
            </div>
          </Link>
          <Link href="/bands" passHref>
            <div className="my-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="Line-up" onClick={closeMenu}>
              Line-up
            </div>
          </Link>
          <Link href="/faq" passHref>
            <div className="my-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="FAQ" onClick={closeMenu}>
              FAQ
            </div>
          </Link>
          <Link href="/Live" passHref>
            <div className="my-2 text-taupe-10 text-4xl cursor-pointer" tabIndex={0} role="link" aria-label="Live Now" onClick={closeMenu}>
              Live Now
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
