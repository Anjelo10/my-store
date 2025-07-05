"use client";
import { useEffect, useState } from "react";
import { converIDR } from "@/utils/currency";
import Script from "next/script";
import ModalDetailOrder from "./ModalDetailOrder";
import productServices from "@/services/product";
import AdminLayout from "@/components/Layout/AdminLayout/page";
import transactionServices from "@/services/transaction";

const AdminOrdersView = () => {
  const [detailOrder, setDetailOrder] = useState({});
  const [products, setProducts] = useState([]);
  const [transaction, setTransaction] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllTransaction = async () => {
    const { data } = await transactionServices.getAllTransaction();
    let result = data.data;
    result = result.filter((t: any) => t.status === "settlement");

    // Urutkan dari yang terbaru ke lama, berdasarkan timestamp di order_id
    result.sort((a: any, b: any) => {
      const timeA = parseInt(a.order_id.split("-")[0]);
      const timeB = parseInt(b.order_id.split("-")[0]);
      return timeB - timeA;
    });
    setTransaction(result);
  };

  useEffect(() => {
    getAllTransaction();
  }, []);
  const handleUpdateShippingStatus = async (
    userId: string,
    orderId: string,
    shippingStatus: string
  ) => {
    try {
      const res = await transactionServices.updateShippingStatus(
        userId,
        orderId,
        shippingStatus
      );
      if (res.status === 200) {
        getAllTransaction();
      }
    } catch (err) {}
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <AdminLayout>
        <div className="px-12 py-7">
          <h1 className="m-3 text-2xl font-bold">Manejemen Order</h1>
          <div className="border border-gray-300 rounded-sm shadow-md">
            <table className="table-custom w-full ">
              <thead className="bg-gray-200">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Username</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Pengiriman</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {transaction?.map((transaction: any, index: number) => {
                  const orderTimestamp = parseInt(
                    transaction.order_id.split("-")[0]
                  );
                  const orderDate = new Date(orderTimestamp).toLocaleString(
                    "id-ID",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  );
                  return (
                    <tr
                      key={transaction.order_id}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>{transaction.order_id}</td>
                      <td>{transaction.user.fullname}</td>
                      <td>{converIDR(transaction.total)}</td>
                      <td>
                        <span className="bg-green-200 text-green-600 px-2 rounded">
                          {transaction.status}
                        </span>
                      </td>
                      <td>{orderDate}</td>
                      <td>
                        <select
                          value={transaction.shippingStatus}
                          onChange={(e) =>
                            handleUpdateShippingStatus(
                              transaction.user.id,
                              transaction.order_id,
                              e.target.value
                            )
                          }
                        >
                          <option value="proses_packing">Proses Packing</option>
                          <option value="paket_dikirim">Paket Dikirim</option>
                        </select>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setDetailOrder(transaction);
                            }}
                            className="cursor-pointer bg-yellow-500 text-white px-2 rounded-sm p-2 flex items-center justify-center"
                          >
                            <i className="bx  bx-dots-vertical-rounded text-2xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
      {Object.keys(detailOrder).length > 0 && (
        <ModalDetailOrder
          setDetailOrder={setDetailOrder}
          detailOrder={detailOrder}
          products={products}
        />
      )}
    </>
  );
};

export default AdminOrdersView;
