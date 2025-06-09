import { Products } from "@/type/products.type";
import { converIDR } from "@/utils/currency";
import Image from "next/image";

type Proptype = {
  product: Products;
};

const CardProduct = (props: Proptype) => {
  const { product } = props;
  return (
    <div className="border border-gray-300 rounded-sm  hover:scale-102 transition duration-300 ease-in-out shadow-md">
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-[100%] h-[300px] object-cover"
        />
      ) : (
        <p>Image Loading...</p>
      )}
      <div className="p-4">
        <h1 className="font-bold text-xl">{product.name}</h1>
        <h1 className="text-sm capitalize">{product.category}</h1>
        <p className="text-xl font-semibold text-yellow-500">
          {converIDR(product.price)}
        </p>
      </div>
    </div>
  );
};

export default CardProduct;
