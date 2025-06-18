import { retrieveDataById, updateData } from "@/lib/firebase/service";
import {
  createTransaction,
  getTransactionStatus,
} from "@/lib/midtrans/transaction";
import { verify } from "@/utils/verifyToken";
import { arrayUnion } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: { id: string }) => {
      if (decoded.id) {
        const order_id = req.query.order_id;
        getTransactionStatus(`${order_id}`, async (result: any) => {
          res.status(200).json({
            status: true,
            statusCode: 200,
            message: "Berhasil mengambil data",
            result: result,
          });
        });
      }
    });
  } else if (req.method === "POST") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const payload = req.body;
      delete payload.user.address.isMain;
      const genereateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
      const params = {
        transaction_details: {
          order_id: genereateOrderId,
          gross_amount: payload.transaction.total,
        },
        customer_details: {
          first_name: payload.user.fullname,
          email: payload.user.email,
          phone: payload.user.address.phone,
          shippinh_address: {
            first_name: payload.user.address.recipient,
            email: payload.user.email,
            phone: payload.user.address.phone,
            address: payload.user.address.address,
          },
          item_details: payload.transaction.items,
        },
      };
      createTransaction(
        params,
        async (transaction: { token: string; redirect_url: string }) => {
          const newTransaction = {
            ...payload.transaction,
            address: payload.user.address,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            status: "pending",
            order_id: genereateOrderId,
          };
          const data = {
            transaction: arrayUnion(newTransaction),
            carts: [],
          };
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Berhasil mengambil data",
                token: transaction.token,
                redirect_url: transaction.redirect_url,
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Gagal",
              });
            }
          });
        }
      );
    });
  } else if (req.method === "PUT") {
    verify(req, res, false, async (decoded: { id: string }) => {
      if (decoded.id) {
        const order_id = req.query.order_id;
        getTransactionStatus(`${order_id}`, async (result: any) => {
          const user: any = await retrieveDataById("users", decoded.id);
          const index = user.transaction.findIndex(
            (transaction: any) => transaction.order_id === order_id
          );
          if (index !== -1) {
            user.transaction[index].status = result.transaction_status;
          }
          const data = { transaction: user.transaction };
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Berhasil Mengambil Dat Put",
                result: result,
                data: data,
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Gagal",
              });
            }
          });
        });
      }
    });
  }
}
