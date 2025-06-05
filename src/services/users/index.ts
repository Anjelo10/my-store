import instance from "@/lib/axios/instance";

export const userServices = {
  getAllUsers: () => instance.get("/api/user/userman"),

  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/api/user/userman/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUser: (id: string, token: string) => {
    return instance.delete(`/api/user/userman/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getUserProfile: (token: string) =>
    instance.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProfile: (data: any, token: string) =>
    instance.put(
      `/api/user/profile`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getCart: (token: string) =>
    instance.get("/api/user/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  addToCart: (data: any, token: string) =>
    instance.put(
      `/api/user/cart`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};

export default userServices;
