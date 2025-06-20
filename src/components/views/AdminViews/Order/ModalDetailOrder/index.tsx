"use client";
import Modal from "@/components/ui/Modal/Modal";
import { Products } from "@/type/products.type";
import { converIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction } from "react";

type Proptype = {
  setDetailOrder: Dispatch<SetStateAction<{}>>;
  detailOrder: any;
  products: Products[];
};

const ModalDetailOrder = (props: Proptype) => {
  const { setDetailOrder, detailOrder, products } = props;
  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };
  return (
    <Modal onClose={() => setDetailOrder({})}>
      <h1 className="text-2xl font-bold mb-3 ">Detail Order</h1>
      <h1 className="text-xl  font-bold text-yellow-500 bg-yellow-100 px-2">
        Data Order
      </h1>
      <div className="grid grid-cols-3 gap-5 mb-5 p-2">
        <div className="flex flex-col">
          <h1 className="text-md font-semibold ">Order ID </h1>
          <p className="text-sm">{detailOrder.order_id}</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-md font-semibold ">Total </h1>
          <p className="text-sm">{converIDR(detailOrder.total)}</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-md font-semibold ">Status </h1>
          <p className="text-sm">{detailOrder.status}</p>
        </div>
      </div>
      <h1 className="text-xl font-bold text-yellow-500 bg-yellow-100 px-2">
        Data Penerima
      </h1>
      <div className="grid grid-cols-3 gap-5 p-2">
        <div>
          <h1 className="text-md font-semibold ">Penerima</h1>
          <p className="text-sm">{detailOrder.address.recipient}</p>
        </div>
        <div>
          <h1 className="text-md font-semibold ">Phone</h1>
          <p className="text-sm">{detailOrder.address.phone}</p>
        </div>
        <div>
          <h1 className="text-md font-semibold ">Catatan</h1>
          <p className="text-sm ">{detailOrder.address.note}</p>
        </div>
        <div>
          <h1 className="text-md font-semibold ">Alamat</h1>
          <p className="text-sm capitalize">
            {detailOrder.address.addressLine}
          </p>
        </div>
      </div>
      <div className="w-full border border-gray-300 p-5 rounded-sm mt-5">
        {detailOrder?.items?.map((item: { id: string; qty: number }) => (
          <Fragment key={item.id}>
            <div className="flex gap-5 m-3 w-full">
              {getProduct(item.id)?.image && (
                <Image
                  className="w-[80px] h-[80px] object-cover"
                  src={`${getProduct(item.id)?.image}`}
                  width={150}
                  height={150}
                  alt={item.id}
                />
              )}
              <div className="w-full">
                <h2 className="font-semibold text-xl mb-2">
                  {getProduct(item.id)?.name}
                </h2>
                <label className="flex gap-2 mb-2 items-center text-xs font-medium">
                  Kuantitas {item.qty}
                </label>
              </div>
              <div className="text-md font-semibold pr-4">
                {converIDR(getProduct(item.id)?.price)}
              </div>
            </div>
            <hr className="border-gray-300 " />
          </Fragment>
        ))}
      </div>
    </Modal>
  );
};

export default ModalDetailOrder;
