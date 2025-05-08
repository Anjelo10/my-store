import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await signUp(req.body, (status: boolean) => {
        if (status) {
          res.status(200).json({ status: 200, message: "success" });
        } else {
          res.status(400).json({ status: 400, message: "failed" });
        }
      });
    } catch (error) {
      console.error("Error in signup:", error);
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method Not Allowed" });
  }
}
