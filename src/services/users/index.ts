import instance from "@/lib/axios/instance";
import { profile } from "console";

const endpoint = {
  users: "/api/user/userman",
  usersPut: "/api/user/",
  usersDel: "/api/user/",
  cart: "/api/user/cart",
  profile: "/api/user/profile",
};

export const userServices = {
  getAllUsers: () => instance.get(endpoint.users),

  updateUser: (id: string, data: any) =>
    instance.put(`${endpoint.usersPut}/${id}`, { data }),
  deleteUser: (id: string) => {
    return instance.delete(`${endpoint.usersDel}/${id}`);
  },
  getUserProfile: () => instance.get(endpoint.profile),
  updateProfile: (data: any) => instance.put(endpoint.profile, { data }),
  getCart: () => instance.get(endpoint.cart),
  addToCart: (data: any) => instance.put(endpoint.cart, { data }),
};

export default userServices;
