import React from "react";
import Image from "next/image";


function HeroText() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/Foofest-logo-2.png"
        alt="Logo"
        width={400}
        height={400}
        className="transform transition duration-800 ease-in-out animate-pulse"
      />
    </div>
  
  );
}

export default HeroText;
