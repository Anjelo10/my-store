"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import Navbar from "@/components/fragments/Navbar/Navbar";
import MemberOrderView from "@/components/views/Member/Order";
import userServices from "@/services/users";
import { useEffect, useState } from "react";

const OrderUserPage = () => {
  const [users, setUsers] = useState([]);
  const { showToast }: any = useToaster();
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <Navbar />
      <MemberOrderView users={users} showToast={showToast} />
    </>
  );
};

export default OrderUserPage;
