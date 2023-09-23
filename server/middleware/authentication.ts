import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET;

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, payload) => {
      if (err) {
        res.sendStatus(403);
      }
      if (!payload) {
        res.sendStatus(403);
      } else if (typeof payload === "string") {
        res.sendStatus(403);
      } else {
        req.headers["userId"] = payload.id;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};
