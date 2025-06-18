"use client";
import AdminLayout from "@/components/Layout/AdminLayout/page";
import { useEffect, useState } from "react";
import { User } from "@/type/users.type";
import { useSession } from "next-auth/react";

type Proptypes = {
  users: User[];
  showToast: (
    message: string,
    variant?: "success" | "error" | "warning"
  ) => void;
};

const OrderUsersView = (props: Proptypes) => {
  const { users, showToast } = props;
  const [updatedUser, setUpdatedUser] = useState<User | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>({});
  const [usersData, setUsersData] = useState<User[]>([]);
  const session: any = useSession();

  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className="px-12 py-7">
          <h1 className="m-3 text-2xl font-bold">Admin Users </h1>
          <div className="border border-gray-300 rounded-sm shadow-md">
            <table className="table-custom w-full ">
              <thead className="bg-gray-200">
                <tr>
                  <th>#</th>
                  <th>Nama Panjang</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Peran</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user: User, index: number) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setUpdatedUser(user)}
                          className="cursor-pointer bg-yellow-500 text-white px-2 rounded-sm p-2 flex items-center justify-center"
                        >
                          <i className="bx  bxs-edit text-xl " />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer bg-red-600 text-white px-2 rounded-sm flex items-center justify-center"
                          onClick={() => setDeletedUser(user)}
                        >
                          <i className="bx  bxs-trash text-xl"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default OrderUsersView;
