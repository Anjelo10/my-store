"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import ProfileMemberView from "@/components/views/Member/Profile/index";
import userServices from "@/services/users";
import { User } from "@/type/users.type";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { showToast }: any = useToaster();

  return <ProfileMemberView showToast={showToast} />;
};

export default ProfilePage;
