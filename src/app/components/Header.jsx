import React from "react";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <div className="bg-white bg-opacity-50 shadow-lg px-4 py-2 rounded-lg flex justify-between items-center">
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          <Image src="/diversa.svg" alt="Diversa Logo" width={140} height={75} />
        </div>
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link href="/bands" className="text-xl hover:text-blue-700 cursor-pointer">
            Bands
          </Link>
        </li>
        <li>
          <Link href="/booking" className="text-xl hover:text-blue-700 cursor-pointer">
            Tickets
          </Link>
        </li>
        <li>
          <Link href="/stages" className="text-xl hover:text-blue-700 cursor-pointer">
            Stages
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
