import React from 'react';
import Image from 'next/image';


const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-16 bg-taupe-10 fixed bottom-0 w-full shadow-md opacity-90">

<div className="footer-image pr-4">
          <Image src="/Foofest-logo-2.png" alt="Footer Image" width={100} height={100} />
        </div>

      <button className="px-6 py-2 text-lg font-medium text-white bg-bono-10 rounded-md hover:bg-blue-700 transition duration-300 font-montserrat">
        Find billetter
      </button>
    </footer>
  );
};

export default Footer;
