"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="flex justify-between items-center h-20 bg-knap-10 w-full shadow-md opacity-90 px-4">
      <Link href="#" onClick={handleScrollToTop}>
        <div className="flex-shrink-0 cursor-pointer">
          <Image src="/Foofest-logo-2.png" alt="Footer Image" width={80} height={80} />
        </div>
      </Link>

      <Link href="/booking" className=" text-center flex justify-center transition duration-300 font-montserrat animate-bounce">
        <button className="px-8 py-4 md:text-base font-medium text-white bg-bono-10 rounded-md hover:bg-blue-600  font-montserrat">Find billetter</button>
      </Link>

      <div className="flex-shrink-0 ">
        <p className="text-bono-10 font-montserrat">Vi ses til FooFest '24!</p>
      </div>
    </footer>
  );
};

export default Footer;
