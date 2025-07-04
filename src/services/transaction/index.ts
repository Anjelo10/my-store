import instance from "@/lib/axios/instance";

const endpoint = {
  transaction: "/api/transaction",
};

const transactionServices = {
  getTransaction: (order_id: string) =>
    instance.get(`${endpoint.transaction}?order_id=${order_id}`),
  getAllTransaction: () => instance.get(`${endpoint.transaction}/admin`),
  generateTransaction: (data: any) => instance.post(endpoint.transaction, data),
  updateTransaction: (order_id: string) =>
    instance.put(
      `${endpoint.transaction}?order_id=${order_id}`,
      {},
      {
        timeout: 10000,
      }
    ),
  updateShippingStatus: (
    userId: string,
    orderId: string,
    shippingStatus: string
  ) =>
    instance.patch(`${endpoint.transaction}/admin`, {
      userId,
      orderId,
      shippingStatus,
    }),
};

export default transactionServices;
