import {
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function heandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async () => {
      const users = await retrieveData("users");
      let data: any = [];
      users.forEach((user: any) => {
        if (user.transaction) {
          const validTransactions = user.transaction
            .filter((transaction: any) =>
              ["settlement", "capture"].includes(transaction.status)
            )
            .map((transaction: any) => {
              return {
                ...transaction,
                user: {
                  id: user.id,
                  fullname: user.fullname,
                },
                shipingStatus: transaction.shipingStatus || "sedang_dikemas",
              };
            });
          console.log(data);
          data = [...data, ...validTransactions];
        }
      });
      data.sort((a: any, b: any) => {
        const aTime = parseInt(a.order_id.split("-")[0]);
        const bTime = parseInt(b.order_id.split("-")[0]);
        return bTime - aTime; // terbaru ke terlama
      });
      res.status(200).json({
        status: true,
        statusCode: 200,
        message: "Sukses Sekali",
        data,
      });
    });
  } else if (req.method === "PATCH") {
    verify(req, res, false, async () => {
      const { userId, orderId, shippingStatus } = req.body;
      if (!userId || !orderId || !shippingStatus) {
        return res
          .status(400)
          .json({ status: false, statusCode: 400, message: "Bad Request" });
      }
      const user: any = await retrieveDataById("users", userId);
      const index = user.transaction.findIndex(
        (transaction: any) => transaction.order_id === orderId
      );
      if (index === -1) {
        return res
          .status(400)
          .json({ status: false, statusCode: 400, message: "Bad Request" });
      }
      user.transaction[index].shippingStatus = shippingStatus;
      await updateData(
        "users",
        userId,
        { transaction: user.transaction },
        (success: boolean) => {
          if (success) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              message: "Sukses Status Update",
            });
          } else {
            res.status(500).json({
              status: false,
              statusCode: 400,
              message: "Gagal Upadate Data",
            });
          }
        }
      );
    });
  }
}
