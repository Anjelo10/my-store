"use client";
import InputFile from "@/components/ui/inputFile";
import Modal from "@/components/ui/Modal/Modal";
import Select from "@/components/ui/Select/Select";
import productServices from "@/services/product";
import { Products } from "@/type/products.type";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Products[]>>;
  showToast: any;
};

const ModalAddProduct = (props: Proptypes) => {
  const { setModalAddProduct, setProductsData, showToast } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

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
    const result = await productServices.addProduct(data);
    if (result.status === 200) {
      setIsLoading(false);
      form.reset();
      showToast("Product berhasil ditambahkan", "success");
      setModalAddProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      showToast("Product berhasil ditambahkan", "success");
    } else {
      setIsLoading(false);
      showToast("Product gagal ditambahkan", "danger");
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className="text-2xl font-bold pt-2">Tambah Produk</h1>

      <form onSubmit={handleSubmit}>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Name</h1>}
          <input
            type="text"
            name="name"
            placeholder="Masukan Nama Produk"
            className="bg-gray-200 p-3 rounded-sm"
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Price</h1>}
          <input
            type="text"
            name="price"
            placeholder="Masukan Harga Produk"
            className="bg-gray-200 p-3 rounded-sm "
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Stok</h1>}
          <input
            type="text"
            name="stock"
            placeholder="Masukan Stok Produk"
            className="bg-gray-200 p-3 rounded-sm "
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Deskripsi</h1>}
          <input
            type="text"
            name="description"
            placeholder="Masukan Deskripsi Produk"
            className="bg-gray-200 p-3 rounded-sm "
          />
        </label>
        <label className="flex flex-col py-2">
          {<h1 className="text-sm mx-2">Image</h1>}
          <input
            type="text"
            name="image"
            placeholder="Masukan Gambar Produk"
            className="bg-gray-200 p-3 rounded-sm "
          />
        </label>
        <Select
          label="Kategori"
          name="category"
          options={[
            { label: "Enbal", value: "enbal" },
            { label: "Kacang", value: "kacang" },
          ]}
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
          {isLoading ? "Loading..." : "Add"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
