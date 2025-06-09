import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "@/utils/verifyToken";

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
    verify(req, res, true, async () => {
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
        } else {
          res.status(400).json({
            status: false,
            statusCode: 400,
            message: "Produk gagal ditambahkan",
            data: {},
          });
        }
      });
    });
  } else if (req.method === "PUT") {
    const { products } = req.query;
    const productId = Array.isArray(products) ? products[1] : products;
    const { data } = req.body;
    if (!productId) {
      return res.status(500).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }
    verify(req, res, true, async () => {
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
    });
  } else if (req.method === "DELETE") {
    const { products } = req.query;
    const productId = Array.isArray(products) ? products[1] : products;
    if (!productId) {
      return res.status(500).json({
        status: false,
        message: "Produk tidak ditemukan",
      });
    }
    verify(req, res, true, async () => {
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
    });
  }
}
