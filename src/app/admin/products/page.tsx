"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import ProductsAdminView from "@/components/views/admin/Products/page";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { showToast }: any = useToaster();
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <ProductsAdminView products={products} showToast={showToast} />
    </>
  );
};

export default AdminProductsPage;
