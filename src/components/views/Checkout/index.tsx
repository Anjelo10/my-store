"use client";
import productServices from "@/services/product";
import userServices from "@/services/users";
import { Products } from "@/type/products.type";
import { converIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import ModalChangeAddress from "./ModalChangeAddress";
import Script from "next/script";
import transactionServices from "@/services/transaction";

type Proptype = {
  showToast: (
    message: string,
    variant?: "success" | "danger" | "warning"
  ) => void;
};

const CheckoutView = (props: Proptype) => {
  const { showToast } = props;
  const [profile, setProfile] = useState<any>({});
  const session: any = useSession();
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const getProfile = async () => {
    const { data } = await userServices.getUserProfile();
    setProfile(data.data);
    if (data?.data?.address?.length > 0) {
      data.data.address.filter((address: { isMain: boolean }, id: number) => {
        if (address.isMain) {
          setSelectedAddress(id);
        }
      });
    }
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.user?.accessToken) {
      getProfile();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getTotalPrice = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += product?.price * item.qty);
      },
      0
    );
    return total;
  };

  const handleCheckout = async () => {
    const payload = {
      user: {
        fullname: profile.fullname,
        email: profile.email,
        address: profile.address[selectedAddress],
      },
      transaction: {
        total: getTotalPrice(),
        items: profile.carts,
      },
    };
    const { data } = await transactionServices.generateTransaction(payload);
    window.snap.pay(data.token);
  };

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="flex sm:px-[10vw] gap-15 md:px-[20vw] py-5">
        <div className="w-[70%]">
          <h1 className="text-2xl font-semibold">Checkout</h1>
          <div className="mt-3 w-full border border-gray-300 p-5 rounded-sm ">
            <h1 className="text-md font-semibold mb-2">Alamat Pengiriman</h1>
            {profile?.address?.length > 0 ? (
              <div>
                <h1 className="font-semibold text-sm mb-1">
                  {profile.address[selectedAddress]?.recipient} -{" "}
                  {profile.address[selectedAddress]?.phone}
                </h1>
                <p className="text-sm mb-1">
                  {profile.address[selectedAddress]?.addressLine}
                </p>
                <p className="text-sm ">
                  Note:{profile.address[selectedAddress]?.note}
                </p>
                <button
                  onClick={() => setChangeAddress(true)}
                  className="bg-yellow-500 text-white px-2 py-1 mt-4 rounded-sm w-full cursor-pointer hover:bg-yellow-600"
                >
                  Ganti Alamat
                </button>
              </div>
            ) : (
              <button
                className="text-white  bg-yellow-500 py-1 rounded-sm hover:bg-yellow-600 cursor-pointer"
                onClick={() => setChangeAddress(true)}
                type="button"
              >
                Tambah Alamat
              </button>
            )}
          </div>
          {profile?.carts?.length > 0 ? (
            <div className="w-full border border-gray-300 p-5 rounded-sm mt-5">
              {profile.carts?.map((item: { id: string; qty: number }) => (
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
          ) : (
            <div className="w-full flex justify-center items-center text-gray-300 h-[50vh]">
              <h1 className="text-2xl font-semibold">Keranjang Kosong</h1>
            </div>
          )}
        </div>
        <div className="w-[30%] ">
          <h1 className="text-2xl font-semibold mb-2">Summary</h1>
          <div className="flex justify-between text-center mb-2">
            <h1 className="font-semibold text-sm">Subtotal</h1>
            <p>{converIDR(getTotalPrice())}</p>
          </div>
          <div className="flex justify-between text-center mb-2">
            <h1 className="font-semibold text-sm">Pengiriman</h1>
            <p>{converIDR(0)}</p>
          </div>
          <div className="flex justify-between text-center mb-2">
            <h1 className="font-semibold text-sm">Pajak</h1>
            <p>{converIDR(0)}</p>
          </div>
          <hr className="border-gray-300 mt-3 mb-3" />
          <div className="flex justify-between text-center">
            <h1 className="font-semibold text-sm">Total</h1>
            <p>{converIDR(getTotalPrice())}</p>
          </div>
          <hr className="border-gray-300 mt-3 mb-3" />
          <button
            onClick={() => handleCheckout()}
            className="w-full text-white  bg-yellow-500 py-1 rounded-sm hover:bg-yellow-600 cursor-pointer"
          >
            Buat Pesanan
          </button>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
          showToast={showToast}
        />
      )}
    </>
  );
};

export default CheckoutView;
