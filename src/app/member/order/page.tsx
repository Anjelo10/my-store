"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import OrderUsersView from "@/components/views/Member/Order/index copy";
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
      <OrderUsersView users={users} showToast={showToast} />
    </>
  );
};

export default OrderUserPage;
