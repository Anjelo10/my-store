import { retrieveData } from "@/lib/firebase/service";
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
  }
}
