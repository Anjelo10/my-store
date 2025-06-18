"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import ProfileMemberView from "@/components/views/Member/Profile/index";

const ProfilePage = () => {
  const { showToast }: any = useToaster();

  return <ProfileMemberView showToast={showToast} />;
};

export default ProfilePage;
