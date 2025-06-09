import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const responseAccess = (res: NextApiResponse) => {
  res.status(403).json({
    status: false,
    statusCode: 403,
    message: "Anda Tidak Memiliki Akses",
    data: [],
  });
};

export const verify = (
  req: NextApiRequest,
  res: NextApiResponse,
  isAdmin: boolean,
  callback: Function
) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  if (token) {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && (isAdmin ? decoded.role === "admin" : true)) {
          callback(decoded);
        } else {
          responseAccess(res);
        }
      }
    );
  } else {
    responseAccess(res);
  }
};
