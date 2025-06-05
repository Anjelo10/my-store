import { Products } from "@/type/products.type";
import { converIDR } from "@/utils/currency";
import Image from "next/image";
import { Fragment } from "react";

type Proptypes = {
  cart: any;
  products: Products[];
};

const CartView = (props: Proptypes) => {
  const { cart, products } = props;
  console.log(cart);
  console.log(products);

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

  return (
    <div className="flex sm:px-[10vw] gap-15 md:px-[20vw] py-5">
      <div className="w-[70%]">
        <h1 className="text-2xl font-semibold">Carts</h1>
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
                      className="text-center no-spinner w-[50px] bg-gray-200   text-sm rounded-lg  p-2.5 "
                      defaultValue={item.qty}
                    />
                  </label>
                  <button
                    name="delete"
                    type="button"
                    className="cursor-pointer  text-gray-600 px-2 rounded-sm "
                  >
                    <i className="bx  bxs-trash text-[20px]"></i>
                  </button>
                </div>
                <div className="text-md font-semibold">
                  {converIDR(getProduct(item.id)?.price)}
                </div>
              </div>
              <hr className="border-gray-300" />
            </Fragment>
          ))}
        </div>
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
        <button className="w-full text-white text-xl bg-yellow-500 py-1 rounded-sm  ">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartView;
