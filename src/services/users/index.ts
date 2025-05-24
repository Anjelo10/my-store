import instance from "@/lib/axios/instance";

export const userServices = {
  getAllUsers: () => instance.get("/api/user/userman"),
  updateUser: (id: string, data: any) =>
    instance.put("/api/user/userman/", { id, data }),
  deleteUser: (id: string) => instance.delete(`/api/user/userman/${id}`),
};

export default userServices;
