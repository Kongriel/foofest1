import React from "react";
import Image from "next/image";


function HeroText() {
  return (
    <div className="flex justify-center items-center mb-8">
    <Image src="/Foofest-logo-2.png" alt="Logo" width={400} height={400} />
  </div>
  
  );
}

export default HeroText;
