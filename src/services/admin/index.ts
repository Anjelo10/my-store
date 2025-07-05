import instance from "@/lib/axios/instance";

export const adminServices = {
  getAllCountUser: () => instance.get("/api/admin/countUsers"),
  getAllCountTransaction: () => instance.get("/api/admin/transactionUsers"),
  getAllCountProduct: () => instance.get("/api/admin/countProduct"),
};
