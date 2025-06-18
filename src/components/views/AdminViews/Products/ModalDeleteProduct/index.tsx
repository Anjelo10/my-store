"use client";
import Modal from "@/components/ui/Modal/Modal";
import productServices from "@/services/product";
import { Products } from "@/type/products.type";
import { Dispatch, SetStateAction, use, useState } from "react";

type Proptype = {
  deletedProduct: Products | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Products[]>>;
  showToast: any;
};

const ModalDeleteProduct = (props: Proptype) => {
  const { deletedProduct, setDeletedProduct, setProductsData, showToast } =
    props;
  const [isLoading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    const result = await productServices.deleteProduct(deletedProduct.id);
    if (result.status === 200) {
      setLoading(false);
      showToast("Produk berhasil dihapus", "success");
      setDeletedProduct({});
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
    } else {
      setLoading(false);
      showToast("Produk gagal dihapus", "danger");
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className="text-2xl font-bold">Are You Sure?</h1>
      <button
        type="button"
        className=" mt-3 cursor-pointer bg-yellow-500 text-white px-2 rounded-sm py-1 flex items-center justify-center"
        onClick={() => handleDeleteUser()}
      >
        {isLoading ? "Deleting..." : "Yes, Delete"}
      </button>
    </Modal>
  );
};

export default ModalDeleteProduct;
