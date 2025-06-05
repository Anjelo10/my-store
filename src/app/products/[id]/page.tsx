"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import Navbar from "@/components/fragments/Navbar/Navbar";
import DetailProductView from "@/components/views/DetailProduct";
import productServices from "@/services/product";
import userServices from "@/services/users";
import { Products } from "@/type/products.type";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
  const params: any = useParams();
  const { showToast }: any = useToaster();
  const [product, setProduct] = useState<Products | {}>([]);
  const [cart, setCart] = useState([]);
  const session: any = useSession();

  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  useEffect(() => {
    getDetailProduct(params.id);
  }, [params.id]);

  useEffect(() => {
    if (session.data?.user?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <div>
      <>
        <Navbar />
        <DetailProductView
          product={product}
          cart={cart}
          productId={params.id}
          showToast={showToast}
        />
      </>
    </div>
  );
};

export default DetailProductPage;
