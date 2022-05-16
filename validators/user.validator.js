import { check } from "express-validator";

const createUserValidator = [
  check("email", "Invalid email").isEmail(),
  check("password", "Weak password").isLength({ min: 6 }),
  check("username", "Invalid username")
    .isLength({ min: 3, max: 20 })
    .matches(/^[A-Za-z\-\_\s]+$/),
];

export { createUserValidator };
