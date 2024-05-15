// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-16 bg-taupe-10 fixed bottom-0 w-full shadow-md opacity-90">
      <button className="px-6 py-2 text-lg font-medium text-white bg-bono-10 rounded-md hover:bg-blue-700 transition duration-300 font-montserrat">
        Find billetter
      </button>
    </footer>
  );
};

export default Footer;
