"use client";
import userServices from "@/services/users";
import { Products } from "@/type/products.type";
import { converIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Proptype = {
  product: Products | any;
  cart: any;
  productId: string;
  showToast: (
    message: string,
    variant?: "success" | "danger" | "warning"
  ) => void;
};

const DetailProductView = (props: Proptype) => {
  const { product, cart, productId, showToast } = props;
  const { status }: any = useSession();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (status === "authenticated") {
      let newCart = [];
      if (cart.filter((item: any) => item.id === productId).length > 0) {
        newCart = cart.map((item: any) => {
          if (item.id === productId) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            qty: 1,
          },
        ];
      }
      try {
        const result = await userServices.addToCart({
          carts: newCart,
        });
        if (result.status === 200) {
          showToast("Berhasil menambahkan ke keranjang", "success");
        }
      } catch (error) {
        console.log(error);
        showToast("Gagal menambahkan ke keranjang", "danger");
      }
    }
  };
  return (
    <div className="px-[15vw] py-[15vh]">
      <div className=" grid lg:grid-cols-2 gap-5">
        <div className=" w-full h-full border border-gray-300 rounded-sm shadow-md">
          <Image
            className="w-[100%] lg:h-[400px] object-cover"
            src={product.image}
            width={200}
            height={200}
            alt="image"
          ></Image>
        </div>
        <div className=" w-full h-full lg:pl-5 ">
          <div className="px-5">
            <h1 className="font-semibold text-4xl ">{product.name}</h1>
            <h1 className="text-md capitalize font-medium pb-3">
              Kategori :{" "}
              <span className="text-yellow-500">{product.category}</span>
            </h1>
            <p className="text-sm">{product?.description}</p>
            <p className="text-sm lg:pt-[3rem]">Stok : {product.stock}</p>
            <p className="text-2xl font-semibold text-yellow-500 ">
              {converIDR(product.price)}
            </p>
            <button
              type={status === "authenticated" ? "submit" : "button"}
              onClick={() =>
                status === "unauthenticated"
                  ? router.push(
                      `/auth/login?callbackUrl=${window.location.href}`
                    )
                  : handleAddToCart()
              }
              className="text-white text-md cursor-pointer bg-yellow-500 px-4 py-2 rounded-sm mt-2 hover:bg-yellow-600 transition duration-300 ease-in-out"
            >
              Masukan Ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
