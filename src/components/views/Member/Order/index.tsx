"use client";
import { useEffect, useState } from "react";
import { User } from "@/type/users.type";
import MemberLayout from "@/components/Layout/MemberLayout/page";
import userServices from "@/services/users";
import { converIDR } from "@/utils/currency";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";
import useMediaQuery from "@/utils/useMediaQuery";
import Link from "next/link";

const MemberOrderView = () => {
  const [profile, setProfile] = useState<User | any>({});
  const [detailOrder, setDetailOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllUsers = async () => {
    const { data } = await userServices.getUserProfile();
    setProfile(data.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const isDesktop = useMediaQuery("(min-width: 640px)");

  const content = (
    <>
      <div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl ml-2"
        >
          <i className="bx bx-menu text-3xl mt-4 mx-2" />
        </button>

        <div
          className={`fixed top-0 left-0 h-full w-60 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">
              <i className="bx bx-x" />
            </button>
          </div>
          <div className="flex flex-col mt-4">
            <Link
              href="/member"
              className="px-4 py-3 hover:bg-yellow-500 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/member/order"
              className="px-4 py-3 hover:bg-yellow-500 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Order
            </Link>
            <Link
              href="/"
              className="px-4 py-3 hover:bg-yellow-500 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="px-12 py-7">
        <h1 className="mb-5 text-center sm:text-left text-2xl font-bold">
          Riwayat Order
        </h1>
        <div className="border border-gray-300 rounded-sm shadow-md overflow-x-auto sm:overflow-visible">
          <table className="table-custom w-full min-w-[600px]">
            <thead className="bg-gray-200">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Pengiriman</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {profile?.transaction?.map((transaction: any, index: number) => (
                <tr
                  key={transaction.order_id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{transaction.order_id}</td>
                  <td>{converIDR(transaction.total)}</td>
                  <td>{transaction.status}</td>
                  <td>
                    <span
                      className={`font-semibold text-xs px-1 py-1 rounded-md ${
                        transaction.shippingStatus === "paket_dikirim"
                          ? "text-green-600 bg-green-200"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {transaction.shippingStatus}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setDetailOrder(transaction)}
                        className="cursor-pointer bg-yellow-500 text-white px-2 rounded-sm p-2 flex items-center justify-center"
                      >
                        <i className="bx bx-dots-vertical-rounded text-2xl" />
                      </button>
                      <button
                        type="button"
                        onClick={() => window.snap.pay(transaction.token)}
                        className={`bg-green-600 text-white px-2 rounded-sm p-2 flex items-center justify-center ${
                          transaction.status !== "pending"
                            ? "opacity-50 cursor-default"
                            : "cursor-pointer"
                        }`}
                        disabled={transaction.status !== "pending"}
                      >
                        <i className="bx bx-money text-2xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="sm:hidden flex items-center justify-center bg-yellow-200 text-yellow-500 mt-2">
          Scroll Ke kanan{">>"}
        </h1>
      </div>
      {Object.keys(detailOrder).length > 0 && (
        <ModalDetailOrder
          setDetailOrder={setDetailOrder}
          detailOrder={detailOrder}
          products={products}
        />
      )}
    </>
  );

  return isDesktop ? <MemberLayout>{content}</MemberLayout> : content;
};

export default MemberOrderView;
