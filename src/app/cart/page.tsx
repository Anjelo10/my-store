"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import Navbar from "@/components/fragments/Navbar/Navbar";
import CartView from "@/components/views/Carts";

const CartPage = () => {
  const { showToast }: any = useToaster();
  return (
    <>
      <Navbar />
      <CartView showToast={showToast} />
    </>
  );
};

export default CartPage;
