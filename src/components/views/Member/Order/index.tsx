"use client";
import { useEffect, useState } from "react";
import { User } from "@/type/users.type";
import MemberLayout from "@/components/Layout/MemberLayout/page";
import userServices from "@/services/users";
import { converIDR } from "@/utils/currency";
import Script from "next/script";

declare global {
  interface Window {
    snap: any;
  }
}

type Proptypes = {
  users: User[];
  showToast: (
    message: string,
    variant?: "success" | "error" | "warning"
  ) => void;
};

const MemberOrderView = (props: Proptypes) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<User | any>({});

  const getAllUsers = async () => {
    const { data } = await userServices.getUserProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <MemberLayout>
        <div className="px-12 py-7">
          <h1 className="m-3 text-2xl font-bold">Riwayat Order</h1>
          <div className="border border-gray-300 rounded-sm shadow-md">
            <table className="table-custom w-full ">
              <thead className="bg-gray-200">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {profile?.transaction?.map(
                  (transaction: any, index: number) => (
                    <tr
                      key={transaction.order_id}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>{transaction.order_id}</td>
                      <td>{converIDR(transaction.total)}</td>
                      <td>{transaction.status}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {}}
                            className="cursor-pointer bg-yellow-500 text-white px-2 rounded-sm p-2 flex items-center justify-center"
                          >
                            <i className="bx  bx-dots-vertical-rounded text-2xl" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              window.snap.pay(transaction.token);
                            }}
                            className={` bg-green-600 text-white px-2 rounded-sm p-2 flex items-center justify-center ${
                              transaction.status !== "pending"
                                ? "opacity-50 cursor-default"
                                : "cursor-pointer"
                            }`}
                            disabled={transaction.status !== "pending"}
                          >
                            <i className="bx  bx-money text-2xl " />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </MemberLayout>
    </>
  );
};

export default MemberOrderView;
