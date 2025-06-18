"use client";
import Navbar from "@/components/fragments/Navbar/Navbar";
import SuccessView from "@/components/views/Transaction/Success";
import transactionServices from "@/services/transaction";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const TransactionSuccessPage = () => {
  const searchParams: any = useSearchParams();
  const orderId = searchParams.get("order_id");
  const checkPayment = async () => {
    if (!orderId) return;
    await transactionServices.updateTransaction(orderId);
  };
  useEffect(() => {
    if (!orderId) return;
    checkPayment();
  }, [orderId]);
  return (
    <div>
      <Navbar />
      <SuccessView />
    </div>
  );
};
export default TransactionSuccessPage;
