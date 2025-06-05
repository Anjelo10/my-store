"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../asset/assets";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/products" },
];
const Navbar = () => {
  const { data }: any = useSession();
  const pathname: any = usePathname();
  const { push } = useRouter();
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-black">
      <Link href="/">
        <Image
          className="cursor-pointer w-15 md:w-20"
          src={assets.logo}
          alt="logo"
        />
      </Link>
      <div className="flex items-center gap-3">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`px-4 py-2 rounded 
              ${
                pathname === item.href
                  ? "font-semibold text-black"
                  : "text-black hover:text-black"
              }`}
          >
            <h1>{item.label}</h1>
          </Link>
        ))}
      </div>
      {data ? (
        <div className="flex items-center  gap-5 relative">
          <div>
            <Link href={"/cart"}>
              <i className="bx  bx-cart text-2xl cursor-pointer" />
            </Link>
          </div>
          <div className="">
            <Image
              width={35}
              height={35}
              src={data?.user?.image}
              alt={data?.user?.name}
              className="rounded-2xl"
              onClick={() => setDropDown(!dropDown)}
            />
            <div
              className={`absolute rounded-md right-0 shadow-md top-10 bg-white ${
                dropDown ? "block" : "hidden"
              }`}
            >
              <button
                className="text-left py-2 px-3 w-[100px] text-sm cursor-pointer rounded-t-sm hover:bg-yellow-500"
                onClick={() => push("/member/profile")}
              >
                Profile
              </button>
              <button
                className="text-left py-2 px-3 w-[100px] text-sm cursor-pointer rounded-b-sm hover:bg-yellow-500"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="cursor-pointer flex items-center gap-2 hover:bg-yellow-600 transition bg-yellow-500 py-1 px-2 rounded-md"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
