"use client";
import MemberLayout from "@/components/Layout/MemberLayout/page";
import userServices from "@/services/users";
import { User } from "@/type/users.type";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import useMediaQuery from "@/utils/useMediaQuery";
import Link from "next/link";

type Propstype = {
  showToast: (
    message: string,
    variant?: "success" | "danger" | "warning"
  ) => void;
};

const ProfileMemberView = ({ showToast }: Propstype) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<User | any>({});
  const [menuOpen, setMenuOpen] = useState(false);

  const getAllUsers = async () => {
    const { data } = await userServices.getUserProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: any = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(data);
    if (result.status === 200) {
      setProfile({
        ...profile,
        fullname: data.fullname,
      });
      form.reset();
      showToast("Profile berhasil diubah", "success");
    } else {
      setLoading(false);
      showToast("Profile gagal diubah", "danger");
    }
  };

  const isDesktop = useMediaQuery("(min-width: 640px)");

  const content = (
    <>
      <div>
        {/* Hamburger Menu: hanya muncul di sm */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl ml-2"
        >
          <i className="bx bx-menu text-3xl mt-4 mx-2" />
        </button>

        {/* Slide Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-60 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">
              <i className="bx bx-x" />
            </button>
          </div>
          <div className="flex flex-col mt-4">
            <Link
              href="/member"
              className="px-4 py-3 hover:bg-yellow-500 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/member/order"
              className="px-4 py-3 hover:bg-yellow-500 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Order
            </Link>
            <Link
              href="/"
              className="px-4 py-3 hover:bg-yellow-500 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
      <h1 className="text-2xl sm:text-left text-center sm:text-xl font-semibold m-5 ">
        Profile Page
      </h1>
      <div className="flex flex-col sm:flex-row gap-6 mt-5">
        <div className="w-full flex-col sm:w-[350px] smh-[350px] sm:shadow-md flex items-center justify-center">
          {profile?.image ? (
            <Image
              src={profile.image}
              alt="Profile"
              width={200}
              height={100}
              className="rounded-full"
            />
          ) : (
            <p>Loading profile image...</p>
          )}

          <h1 className="text-xl font-bold mt-3 text-shadow-lg">
            {profile.fullname}
          </h1>
        </div>
        <div className="w-full sm:w-[75%] h-[350px] shadow-md">
          <form onSubmit={handleChangeProfile} className="flex flex-col  m-4">
            <label className="ml-2 text-sm ">Fullname</label>
            <input
              type="text"
              name="fullname"
              defaultValue={profile.fullname}
              className="bg-gray-200 p-2 rounded-sm w-full mb-3 text-sm"
            />
            <label className="ml-2 text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={profile.phone}
              className="bg-gray-200 p-2 rounded-sm w-full mb-3 text-sm"
            />
            <label className="ml-2 text-sm">Email</label>
            <input
              type="text"
              name="email"
              defaultValue={profile.email}
              disabled
              className="bg-gray-200 p-2 rounded-sm w-full mb-3 text-sm opacity-50"
            />
            <label className="ml-2 text-sm">Role</label>
            <input
              type="text"
              name="role"
              defaultValue={profile.role}
              disabled
              className="bg-gray-200 p-2 rounded-sm w-full mb-3 text-sm opacity-50"
            />
            <button
              type="submit"
              className="cursor-pointer flex  items-center gap-2 hover:bg-yellow-600 transition bg-yellow-500 py-1 px-2 rounded-md"
            >
              {loading ? "Loading..." : "Update Profile"}
            </button>
          </form>{" "}
        </div>
      </div>
    </>
  );
  return isDesktop ? <MemberLayout>{content}</MemberLayout> : content;
};

export default ProfileMemberView;
