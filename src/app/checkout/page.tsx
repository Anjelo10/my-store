"use client";
import { useToaster } from "@/components/common/ToasterWrapper";
import Navbar from "@/components/fragments/Navbar/Navbar";
import CheckoutView from "@/components/views/Checkout";

const ChekckOutPage = () => {
  const { showToast }: any = useToaster();

  return (
    <>
      <Navbar />
      <CheckoutView showToast={showToast} />
    </>
  );
};

export default ChekckOutPage;
