"use client";
import MemberLayout from "@/components/Layout/MemberLayout/page";
import userServices from "@/services/users";
import { User } from "@/type/users.type";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

type Propstype = {
  showToast: (
    message: string,
    variant?: "success" | "danger" | "warning"
  ) => void;
};

const ProfileMemberView = ({ showToast }: Propstype) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<User | any>({});

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
  return (
    <MemberLayout>
      <h1 className="text-xl font-semibold">Profile Page</h1>
      <div className="flex gap-6 mt-5">
        <div className="flex-col w-[350px] h-[350px] shadow-md flex items-center justify-center">
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
        <div className="w-[75%] h-[350px] shadow-md">
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
              Update Profile
            </button>
          </form>{" "}
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
