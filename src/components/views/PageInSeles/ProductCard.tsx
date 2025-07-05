import { getLimitedProducts } from "@/lib/firebase/service";
import { converIDR } from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductCard = async () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getLimitedProducts("product", 4, false);
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div
      className="flex flex-col  items-center pt-14 mb-14 px-6 md:px-16 lg:px-32 "
      id="product"
    >
      <h1 className="text-4xl font-bold text-center w-full mb-7 text-shadow mt2 md:mt-10">
        Produk <span className="text-yellow-500">Kita</span>
      </h1>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {products?.map((product: any) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div>
              <div className="border cursor-pointer border-gray-300 rounded-sm  hover:scale-102 transition duration-300 ease-in-out ">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-[100%] h-[100px] sm:h-[300px] object-cover"
                  />
                ) : (
                  <p>Image Loading...</p>
                )}
                <div className="p-4">
                  <h1 className="font-medium sm:text-xl">{products.name}</h1>
                  <h1 className="text-sm text-gray-500 capitalize">
                    {products.category}
                  </h1>
                  <p className="sm:text-xl font-semibold text-yellow-500">
                    {converIDR(products.price)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link href={"/products"}>
        <button className="cursor-pointer mt-8 px-12 py-2.5 border rounded text-gray-500/70 hover:bg-yellow-500 hover:text-white transition">
          See more
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
