"use client";
import Navbar from "@/components/fragments/Navbar/Navbar";
import ProductView from "@/components/views/Products";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Navbar />
      <ProductView product={products} />
    </>
  );
};
export default ProductsPage;
