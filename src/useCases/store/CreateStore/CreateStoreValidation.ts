import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validateStore = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("The store title can't be empty!")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Minimum 2 characters required!")
    .bail(),
  check("owner_id")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("The store must belong to a user")
    .bail(),
  (req: Request, res: Response, next: NextFunction): Response => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ success: false, errors: errors.array() });
    next();
  },
];
