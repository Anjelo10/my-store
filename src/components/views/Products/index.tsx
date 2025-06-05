import { Products } from "@/type/products.type";
import CardProduct from "./Card";
import Link from "next/link";

type Proptype = {
  product: Products[];
};
const ProductView = (props: Proptype) => {
  const { product } = props;

  return (
    <div className="">
      <div className=" md:px-16 lg:px-32 py-5">
        <h1 className="text-3xl font-bold my-2">Product Page</h1>
        <p className="lg:w-[60%] sm:w-full">
          Kesyang adalah cemilan tradisional yang diolah dar singkong pilihan,
          menghadirkan rasa autentik nusantara dengan sentuhan kekinian
        </p>
      </div>
      <div className="grid lg:grid-cols-4 gap-5 sm:grid-cols-2 sm:px-6 md:px-16 lg:px-32 py-5 md:text-lg">
        {product.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <CardProduct product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductView;
