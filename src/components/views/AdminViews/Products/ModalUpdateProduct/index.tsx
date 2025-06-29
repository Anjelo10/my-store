"use client";
import InputFile from "@/components/ui/inputFile";
import Modal from "@/components/ui/Modal/Modal";
import Select from "@/components/ui/Select/Select";
import productServices from "@/services/product";
import { Products } from "@/type/products.type";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  updatedProduct: Products | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Products[]>>;
  showToast: any;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const { updatedProduct, setUpdatedProduct, setProductsData, showToast } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      price: form.price.value,
      stock: form.stock.value,
      category: form.category.value,
      image: form.image.value,
      description: form.description.value,
    };
    const result = await productServices.updateProduct(updatedProduct.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      showToast("Product berhasil di Edit", "success");
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      showToast("Product berhasil di Edit", "success");
    } else {
      setIsLoading(false);
      showToast("Product gagal di Edit", "danger");
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1 className="text-2xl font-bold pt-2">Update Product</h1>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Name</h1>}
          <input
            type="text"
            name="name"
            placeholder="Masukan Nama Produk"
            className="bg-gray-200 p-3 rounded-sm "
            defaultValue={updatedProduct.name}
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Price</h1>}
          <input
            type="text"
            name="price"
            placeholder="Masukan Harga Produk"
            className="bg-gray-200 p-3 rounded-sm "
            defaultValue={updatedProduct.price}
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Stok</h1>}
          <input
            type="text"
            name="stock"
            placeholder="Masukan Stok Produk"
            className="bg-gray-200 p-3 rounded-sm  "
            defaultValue={updatedProduct.stock}
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Deskripsi</h1>}
          <input
            type="text"
            name="description"
            placeholder="Masukan DeskripsiProduk"
            className="bg-gray-200 p-3 rounded-sm  "
            defaultValue={updatedProduct.stock}
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Image</h1>}
          <input
            type="text"
            name="image"
            placeholder="Masukan Link Gambar Produk"
            className="bg-gray-200 p-3 rounded-sm  "
            defaultValue={updatedProduct.image}
          />
        </label>
        <Select
          label="Kategori"
          name="category"
          options={[
            { label: "Enbal", value: "enbal" },
            { label: "Kacang", value: "kacang" },
          ]}
          defaultValue={updatedProduct.category}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Rilis", value: "true" },
            { label: "Belum Rilis", value: "false" },
          ]}
        />
        <button
          type="submit"
          className="cursor-pointer flex my-3 items-center gap-2 hover:bg-yellow-600 transition bg-yellow-500 py-1 px-2 rounded-md"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
