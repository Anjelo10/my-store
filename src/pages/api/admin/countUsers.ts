import { getUserCountUsers } from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async () => {
      const count = await getUserCountUsers();
      res.status(200).json({ status: true, statusCode: 200, data: count });
    });
  } else {
    res.status(405).json({
      status: false,
      statusCode: 405,
      message: "Method Not Allowed",
    });
  }
}
