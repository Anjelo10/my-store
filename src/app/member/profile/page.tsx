"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import ProfileMemberView from "@/components/views/Member/Profile/index";
import userServices from "@/services/users";
import { User } from "@/type/users.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [profile, setProfile] = useState<User | {}>({});
  const session: any = useSession();
  const { showToast }: any = useToaster();
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getUserProfile(
        session.data?.user?.accessToken
      );
      setProfile(data.data);
    };
    getAllUsers();
  }, [session]);
  return (
    <>
      <ProfileMemberView
        profile={profile}
        session={session}
        setProfile={setProfile}
        showToast={showToast}
      />
    </>
  );
};

export default ProfilePage;
