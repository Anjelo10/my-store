import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function heandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retrieveData("users");
    const data = users.map((user: any) => {
      delete user.password;
      return user;
    });
    res
      .status(200)
      .json({ status: true, statusCode: 200, message: "Succses", data });
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
                message: "Berhasil Update Profile",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Gagal Update Profile",
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
                message: "Access Denied",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 400,
            message: "failed",
          });
        }
      }
    );
  }
}
