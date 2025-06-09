import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { verify } from "@/utils/verifyToken";

export default async function heandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { id } = req.query;
      const { data } = req.body;
      await updateData("users", `${id}`, data, (result: boolean) => {
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
    });
  } else if (req.method === "DELETE") {
    verify(req, res, true, async () => {
      const { id } = req.query;
      await deleteData("users", `${id}`, (result: boolean) => {
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
    });
  }
}
