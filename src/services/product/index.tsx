import instance from "@/lib/axios/instance";

export const productServices = {
  getAllProducts: () => instance.get("/api/product/products"),
  getDetailProduct: (id: string) => instance.get(`/api/product/products/${id}`),
  addProduct: (data: any, token: string) =>
    instance.post("/api/product/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/api/product/products/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteProduct: (id: string, token: string) => {
    return instance.delete(`/api/product/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default productServices;
