"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../asset/assets";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Produk", href: "/products" },
  { label: "Kotak", href: "/#contact" },
];

const Navbar = () => {
  const { data }: any = useSession();
  const pathname = usePathname();
  const { push } = useRouter();
  const [dropDown, setDropDown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-black">
      <Link href="/">
        <Image
          className="cursor-pointer w-15 md:w-20"
          src={assets.logo}
          alt="logo"
        />
      </Link>

      <div className="hidden sm:flex items-center gap-3">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`px-4 py-2 rounded ${
              pathname === item.href
                ? "font-semibold text-black"
                : "text-black hover:text-black"
            }`}
          >
            <h1>{item.label}</h1>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-5 relative">
        {data && (
          <Link href="/cart">
            <i className="bx bx-cart text-2xl cursor-pointer" />
          </Link>
        )}

        {data ? (
          <div className="flex items-center gap-3">
            {data.user.image ? (
              <Image
                width={35}
                height={35}
                src={data.user.image}
                alt={data.user.name}
                className="rounded-2xl cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
            ) : (
              <div
                className="w-[35px] h-[35px] bg-black rounded-full text-white flex items-center justify-center cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              >
                P
              </div>
            )}

            <button
              className="sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="bx bx-menu text-2xl" />
            </button>

            <div
              className={`absolute rounded-md right-0 shadow-md top-12 bg-white z-50 ${
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
        ) : (
          <button
            onClick={() => signIn()}
            className="cursor-pointer flex items-center gap-2 hover:bg-yellow-600 transition bg-yellow-500 py-1 px-2 rounded-md"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full right-0 w-full bg-white shadow-md sm:hidden z-40">
          <div className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 border-b border-gray-200 text-black hover:text-yellow-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
