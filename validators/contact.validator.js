import { check } from "express-validator";

const createContactValidator = [
  check("userId", "empty userId").notEmpty().isString(),
];

export { createContactValidator };
