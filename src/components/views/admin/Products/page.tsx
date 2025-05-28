"use client";
import AdminLayout from "@/components/Layout/AdminLayout/page";
import { useEffect, useState } from "react";
import { User } from "@/type/users.type";
import Image from "next/image";
import { assets } from "@/components/asset/assets";
import { converIDR } from "@/utils/currency";
import { Products } from "@/type/products.type";

type Proptypes = {
  products: Products[];
  showToast: (
    message: string,
    variant?: "success" | "error" | "warning"
  ) => void;
};

const ProductsAdminView = (props: Proptypes) => {
  const { products, showToast } = props;
  const [productsData, setProductsData] = useState<any[]>([]);
  console.log(productsData);
  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className="px-12 py-7">
          <h1 className=" m-3 text-2xl font-bold">Product Management</h1>
          <div className="border border-gray-300 rounded-sm shadow-md">
            <table className=" table-custom w-full ">
              <thead className="border border-black">
                <tr className="bg-gray-200  ">
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Kategori</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={product.image}
                        width={100}
                        height={100}
                        alt={product.name}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.kategori}</td>
                    <td>{converIDR(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="cursor-pointer bg-yellow-500 text-white px-2 rounded-sm p-2 flex items-center justify-center"
                        >
                          <i className="bx  bxs-edit text-xl " />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer bg-red-600 text-white px-2 rounded-sm flex items-center justify-center"
                        >
                          <i className="bx  bxs-trash text-xl"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductsAdminView;
