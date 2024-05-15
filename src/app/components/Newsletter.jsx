import React from "react";
import Link from "next/link";

const Newsletter = () => {
  return (
    <div className="mt-8 text-bono-10">
      <h2 className="text-2xl font-bebas font-bold mb-4">LINKS</h2>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex font-montserrat text-xl gap-12 flex-row md:flex-row md:space-x-8">
          <ul className=" space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Forside
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Bliv frivillig
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Behind the sound
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Line-up
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Billetter
              </Link>
            </li>
            <p className="md:hidden">kontakt@aiasoundfestival.com</p> {/* This line will be visible on mobile */}
          </ul>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Nyheder
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Partnere
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                AiaClub
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                B2B-oplevelsen
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Presse
              </Link>
            </li>
            <p className="hidden md:block">kontakt@aiasoundfestival.com</p> {/* This line will be visible on larger screens */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
