import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function heandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const users = await retrieveData("users");
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || " ",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          const data = users.map((user: any) => {
            delete user.password;
            return user;
          });
          res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Sukses Sekali",
            data,
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Anda Tidak Memiliki Akses",
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || " ",
      async (err: any, decoded: any) => {
        if (decoded.role === "admin") {
          await updateData("users", user[2], data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Berhasil Update Role",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Gagal Update Role",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 400,
            message: "Anda Tidak Memiliki Akses",
          });
        }
      }
    );
    res.status(200).json({ status: true, statusCode: 200, message: "Succses" });
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || " ",

      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("users", user[2], (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "succsess",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Gagal Menghapus",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 400,
            message: "Anda Tidak Memiliki Akses",
          });
        }
      }
    );
  }
}
