"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { assets } from "@/components/asset/assets";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};
const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  const { data: session } = useSession();
  const pathname = usePathname();

  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="bg-yellow-500 text-white p-20px h-screen w-[250px] flex flex-col justify-between px-5">
      <div>
        <Link href="/">
          <Image
            className="cursor-pointer w-30 m-5 "
            src={assets.logo_1}
            alt="logo"
          />
        </Link>
        <div className="flex flex-col gap-2 py-2.5  ">
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={list.title}
              className={`${
                pathname === list.url && "bg-white text-yellow-500"
              } flex items-center  gap-2 cursor-pointer p-2 rounded-sm hover:bg-white hover:text-yellow-500 transition`}
            >
              <i className={`bx ${list.icon} text-xl`} />
              <h1>{list.title}</h1>
            </Link>
          ))}
          {isAdmin && !pathname?.startsWith("/admin") && (
            <Link
              href="/admin"
              className="flex items-center gap-2 cursor-pointer p-2 rounded-sm hover:bg-white hover:text-yellow-500 transition"
            >
              <i className="bx bx-cog text-xl" />
              <h1>Admin Panel</h1>
            </Link>
          )}
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => signOut()}
          className="cursor-pointer flex justify-center items-center gap-2 mb-4 text-yellow-500 transition bg-white  py-1 px-2 rounded-sm font-medium w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
