"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import AdminUsersView from "@/components/views/AdminViews/Users";
import userServices from "@/services/users";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
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
      <AdminUsersView users={users} showToast={showToast} />
    </>
  );
};

export default AdminUsersPage;
