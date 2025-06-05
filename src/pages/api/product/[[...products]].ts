import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { products }: any = req.query;
    if (products && products[1]) {
      const data = await retrieveDataById("product", products[1]);
      res
        .status(200)
        .json({ status: true, statusCode: 200, message: "Sekali kahh", data });
    } else {
      const data = await retrieveData("product");
      res
        .status(200)
        .json({ status: true, statusCode: 200, message: "Sekali kahh", data });
    }
  } else if (req.method === "POST") {
    const token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (err || !decoded)
          return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized",
          });
        if (decoded && decoded.role === "admin") {
          const data = req.body;
          data.createdAt = new Date();
          data.updatedAt = new Date();
          data.price = parseInt(data.price);
          data.stock = parseInt(data.stock);
          await addData("product", data, (status: boolean, result: any) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Produk berhasil ditambahkan",
                data: { data },
              });
              if (decoded.role !== "admin") {
                res.status(403).json({
                  status: false,
                  statusCode: 403,
                  message: "Akses Ditolak",
                });
              }
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Produk gagal ditambahkan",
                data: {},
              });
            }
          });
        }
      }
    );
  } else if (req.method === "PUT") {
    const { products } = req.query;
    const productId = Array.isArray(products) ? products[1] : products;
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!productId) {
      return res.status(500).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await updateData("product", productId, data, (status: boolean) => {
            if (status) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Produk berhasil diperbarui",
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Gagal memperbarui produk",
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Tidak Memiliki Akses",
          });
        }
      }
    );
  } else if (req.method === "DELETE") {
    const { products } = req.query;
    const productId = Array.isArray(products) ? products[1] : products;
    const token = req.headers.authorization?.split(" ")[1] || "";
    if (!productId) {
      return res.status(500).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || " ",

      async (err: any, decoded: any) => {
        if (decoded && decoded.role === "admin") {
          await deleteData("product", productId, (result: boolean) => {
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
