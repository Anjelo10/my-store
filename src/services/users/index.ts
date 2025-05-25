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
};

export default userServices;
