import { check } from "express-validator";

const createMessageValidator = [
  check("text", "empty userId").notEmpty().isString(),
];

export { createMessageValidator };
