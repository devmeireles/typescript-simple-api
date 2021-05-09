import { Request, Response, NextFunction } from "express";
import { consts } from "@config/constants";
import * as jwt from "jsonwebtoken";

const checkJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction => {
  const token = req.headers["authorization"];
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, consts.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send({
      success: false,
      message: error,
    });
    return;
  }

  const { id, email } = jwtPayload;
  const newToken = jwt.sign({ id, email }, consts.jwtSecret, {
    expiresIn: "1h",
  });

  res.setHeader("token", newToken);

  next();
};

export default checkJWT;
