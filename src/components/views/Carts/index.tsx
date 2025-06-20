"use client";
import productServices from "@/services/product";
import userServices from "@/services/users";
import { Products } from "@/type/products.type";
import { converIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

type Proptype = {
  showToast: (
    message: string,
    variant?: "success" | "danger" | "warning"
  ) => void;
};

const CartView = (props: Proptype) => {
  const { showToast } = props;
  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const [products, setProducts] = useState<Products[]>([]);

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
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
      getCart();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += product?.price * item.qty);
      },
      0
    );
    return total;
  };

  const handleDeleteCart = async (id: string) => {
    const newCart = cart.filter((item: { id: string }) => {
      return item.id !== id;
    });
    try {
      const reusult = await userServices.addToCart({ carts: newCart });
      if (reusult.status === 200) {
        setCart(newCart);
        showToast("Berhasil menghapus produk", "success");
      }
    } catch (error) {
      showToast("Gagal menghapus produk", "danger");
    }
  };

  const handleQtyChange = async (id: string, qty: number) => {
    if (qty < 1) return;

    const updatedCart: any = cart.map((item: any) =>
      item.id === id ? { ...item, qty } : item
    );

    setCart(updatedCart);

    try {
      await userServices.addToCart({ carts: updatedCart });
      showToast("Jumlah produk diperbarui", "success");
    } catch (err) {
      showToast("Gagal menyimpan perubahan", "danger");
    }
  };

  return (
    <div className="flex sm:px-[10vw] gap-15 md:px-[20vw] py-5">
      <div className="w-[70%]">
        <h1 className="text-2xl font-semibold">Carts</h1>
        {cart.length > 0 ? (
          <div className="w-full">
            {cart.map((item: { id: string; qty: number }) => (
              <Fragment key={item.id}>
                <div className="flex gap-5 m-5 w-full">
                  {getProduct(item.id)?.image && (
                    <Image
                      className="w-[150px] h-[150px] object-cover"
                      src={`${getProduct(item.id)?.image}`}
                      width={150}
                      height={150}
                      alt={item.id}
                    />
                  )}
                  <div className="w-full">
                    <h2 className="font-semibold text-xl">
                      {getProduct(item.id)?.name}
                    </h2>
                    <p className="text-sm capitalize">
                      {getProduct(item.id)?.category}
                    </p>
                    <label className="flex gap-2 mt-5 mb-2 items-center text-sm font-semibold">
                      Kuantitas
                      <input
                        type="number"
                        className="opacity-50 text-center no-spinner w-[50px] bg-gray-200   text-sm rounded-lg  p-2.5 "
                        defaultValue={item.qty}
                        onChange={(e) =>
                          handleQtyChange(item.id, Number(e.target.value))
                        }
                      />
                    </label>
                    <button
                      name="delete"
                      type="button"
                      className="cursor-pointer  text-gray-600 px-2 rounded-sm "
                      onClick={() => handleDeleteCart(item.id)}
                    >
                      <i className="bx  bxs-trash text-[20px]"></i>
                    </button>
                  </div>
                  <div className="text-md font-semibold pr-4">
                    {converIDR(getProduct(item.id)?.price)}
                  </div>
                </div>
                <hr className="border-gray-300" />
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
        <Link href="/checkout">
          <button className="w-full text-white  bg-yellow-500 py-1 rounded-sm cursor-pointer hover:bg-yellow-600">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartView;
