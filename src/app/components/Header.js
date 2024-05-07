import React from "react";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <nav className=" shadow-glass-1 px-4 rounded-lg bg-white bg-opacity-50">
      <ul className="flex justify-between items-center">
        <li className="p-3">
          <Link href={"/"}>
            <Image src="/diversa.svg" alt="Diversa Logo" width={140} height={75} />
          </Link>
        </li>
        <li className="text-xl pr-7">
          <Link href={"/rules"}>Rules</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
