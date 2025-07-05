"use client";
import AdminLayout from "@/components/Layout/AdminLayout/page";
import { adminServices } from "@/services/admin";
import userServices from "@/services/users";
import { User } from "@/type/users.type";
import { converIDR } from "@/utils/currency";
import { useEffect, useState } from "react";

const DashboardAdminView = () => {
  const [profile, setProfile] = useState<User | any>({});
  const [countUser, setCountUser] = useState<number | null>(null);
  const [totalTransaction, setTotalTransaction] = useState<number | null>(null);
  const [totalProduct, setTotalProduct] = useState<number | null>(null);

  console.log(totalProduct);
  console.log(totalTransaction);
  const getAllUsers = async () => {
    const { data } = await userServices.getUserProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const getCountUser = async () => {
    const { data } = await adminServices.getAllCountUser();
    setCountUser(data.data);
  };
  useEffect(() => {
    getCountUser();
  }, []);

  const getTransactionUser = async () => {
    const { data } = await adminServices.getAllCountTransaction();
    setTotalTransaction(data.data);
  };
  useEffect(() => {
    getTransactionUser();
  }, []);

  const getProductAdmin = async () => {
    const { data } = await adminServices.getAllCountProduct();
    setTotalProduct(data.data);
  };
  useEffect(() => {
    getProductAdmin();
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className="px-12 py-7">
          <h1 className=" my-3 text-2xl font-bold">Admin Dashboard</h1>
          <h1 className="text-md bg-yellow-500 px-2 py-2 rounded-sm text-white">
            Selamat datang <span className="font-bold">{profile.fullname}</span>{" "}
            sebagai Admin
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="bg-yellow-200 flex py-4 px-8 justify-around rounded-sm items-center">
              <div>
                <h1 className="text-4xl text-yellow-500 text-center font-bold ">
                  {countUser}
                </h1>
                <h1 className="text-md  px-2  rounded-sm text-yellow-500 font-semibold">
                  Total User
                </h1>
              </div>
              <i className="bx  bx-user text-8xl text-yellow-500"></i>
            </div>
            <div>
              <div className="bg-green-200 flex py-4 px-8 justify-around rounded-sm items-center">
                <div className="flex flex-col  ">
                  <h1 className="text-2xl text-green-500 text-center font-bold">
                    {converIDR(totalTransaction)}
                  </h1>
                  <h1 className="text-md  px-2  rounded-sm text-green-500 font-semibold">
                    Total Penjualan
                  </h1>
                </div>
                <i className="bx  bx-wallet text-8xl text-green-500"></i>
              </div>
            </div>
            <div>
              <div className="bg-blue-200 flex py-4 px-8 justify-around rounded-sm items-center">
                <div className="flex flex-col  ">
                  <h1 className="text-2xl text-blue-500 text-center font-bold">
                    {totalProduct}
                  </h1>
                  <h1 className="text-md  px-2  rounded-sm text-blue-500 font-semibold">
                    Total Product
                  </h1>
                </div>
                <i className="bx  bx-wallet text-8xl text-blue-500"></i>
              </div>
            </div>
            <div className="bg-yellow-500"></div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default DashboardAdminView;
