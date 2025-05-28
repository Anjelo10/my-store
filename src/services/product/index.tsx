import instance from "@/lib/axios/instance";

export const productServices = {
  getAllProducts: () => instance.get("/api/product/products"),
};

export default productServices;
