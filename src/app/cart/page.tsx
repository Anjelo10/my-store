"use client";
import Navbar from "@/components/fragments/Navbar/Navbar";
import CartView from "@/components/views/cart";
import productServices from "@/services/product";
import userServices from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const [products, setProducts] = useState([]);

  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.user?.accessToken) {
      getCart(session.data?.user?.accessToken);
    }
  }, [session]);

  return (
    <div>
      <Navbar />
      <CartView cart={cart} products={products} />
    </div>
  );
};

export default CartPage;
