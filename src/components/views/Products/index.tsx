import { Products } from "@/type/products.type";
import CardProduct from "./Card";
import Link from "next/link";

type Proptype = {
  product: Products[];
};

const ProductView = ({ product }: Proptype) => {
  return (
    <div className="px-4 sm:px-6 md:px-16 lg:px-5 my-[90px]  max-w-screen-xl mx-auto ">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Product Page</h1>
        <p className="text-sm sm:text-base lg:w-3/4">
          Kesyang adalah cemilan tradisional yang diolah dari singkong pilihan,
          menghadirkan rasa autentik nusantara dengan sentuhan kekinian.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((item) => (
          <Link href={`/products/${item.id}`} key={item.id}>
            <CardProduct product={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductView;
