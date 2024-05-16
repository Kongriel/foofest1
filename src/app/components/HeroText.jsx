import React from "react";
import Image from 'next/image'; 

function HeroText() {
  return (
    <div className="flex text-bono-10 gap-3 mt-8 mb-12 justify-center items-center">
      <div className="flex flex-col items-center">
        <img 
          src="/Foofest-logo-2.png" 
          alt="Foofest Logo" 
          className="w-1/2 mb-4"
        />
        {/* <div className="text-8xl font-semibold font-bebas">Foofest´24</div>
        <div className="w-38 font-montserrat">
          Vi ses til dans, sang, <br /> kærlighed og magi på <br /> Foofest 2024!
        </div> */}
      </div>
    </div>
  );
}

export default HeroText;
