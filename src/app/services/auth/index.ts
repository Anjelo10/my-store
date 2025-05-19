import instance from "@/lib/axios/instance";

export const authService = {
  registerAccount: (data: any) => instance.post("/api/user/register", data),
};

export default authService;
