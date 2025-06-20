export type User = {
  id: string;
  fullname: string;
  email: string;
  role?: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
  type?: string;
  image: string;
};
