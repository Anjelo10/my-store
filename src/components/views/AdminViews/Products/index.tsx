"use client";
import AdminLayout from "@/components/Layout/AdminLayout/page";
import { useEffect, useState } from "react";
import Image from "next/image";
import { converIDR } from "@/utils/currency";
import { Products } from "@/type/products.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

type Proptypes = {
  products: Products[];
  showToast: (
    message: string,
    variant?: "success" | "error" | "warning"
  ) => void;
};

const ProductsAdminView = (props: Proptypes) => {
  const { products, showToast } = props;
  const [productsData, setProductsData] = useState<Products[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Products | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Products | {}>({});
  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className="px-12 py-7">
          <h1 className=" my-3 text-2xl font-bold">Product Management</h1>
          <button
            onClick={() => setModalAddProduct(true)}
            className="font-semibold cursor-pointer text-sm flex items-center mb-3 gap-2 hover:bg-yellow-600 transition bg-yellow-500 py-1 px-1 rounded-md"
          >
            <i className="bx bx-plus font-semibold" />
            Tambah
          </button>
          <div className="border border-gray-300 rounded-sm shadow-md">
            <table className=" table-custom w-full ">
              <thead className="border border-black">
                <tr className="bg-gray-200  ">
                  <th>#</th>
                  <th>Gambar</th>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Alksi</th>
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
                    <td>{product.category}</td>
                    <td>{converIDR(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          name="edit"
                          onClick={() => setUpdatedProduct(product)}
                          type="button"
                          className="cursor-pointer bg-yellow-500 text-white px-2 rounded-sm p-2 flex items-center justify-center"
                        >
                          <i className="bx  bxs-edit text-xl " />
                        </button>
                        <button
                          name="delete"
                          onClick={() => setDeletedProduct(product)}
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
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          showToast={showToast}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          setUpdatedProduct={setUpdatedProduct}
          updatedProduct={updatedProduct}
          showToast={showToast}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setDeletedProduct={setDeletedProduct}
          deletedProduct={deletedProduct}
          showToast={showToast}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
};

export default ProductsAdminView;
