"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../asset/assets";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-black">
      <Link href="/">
        <Image
          className="cursor-pointer w-15 md:w-20"
          src={assets.logo}
          alt="logo"
        />
      </Link>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/product-page" className="hover:text-gray-900 transition">
          Product
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About
        </Link>
        <Link href="#contact" className="hover:text-gray-900 transition">
          Contact
        </Link>
      </div>
      <div className="flex items-center  gap-3">
        <button
          onClick={() => (data ? signOut() : signIn())}
          className="cursor-pointer flex items-center gap-2 hover:bg-yellow-600 transition bg-yellow-500 py-1 px-2 rounded-md"
        >
          {data ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
