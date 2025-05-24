"use client";
import AdminUsersView from "@/components/views/admin/Users/page";
import userServices from "@/services/users";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  console.log(users);
  return (
    <>
      <AdminUsersView users={users} />
    </>
  );
};

export default AdminUsersPage;
