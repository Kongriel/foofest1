import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center h-24 bg-taupe-10 fixed bottom-0 w-full shadow-md opacity-90 px-4">

      <div className="flex-shrink-0">
        <Image src="/Foofest-logo-2.png" alt="Footer Image" width={100} height={100} />
      </div>

      <div className="flex-grow text-center">
        <button className="px-6 py-2 text-lg font-medium text-white bg-bono-10 rounded-md hover:bg-blue-700 transition duration-300 font-montserrat">
          Find billetter
        </button>
      </div>

      <div className="flex-shrink-0">
        <p className="text-bono-10 font-montserrat">Vi ses til FooFest '24!</p>
      </div>
    </footer>
  );
};

export default Footer;
