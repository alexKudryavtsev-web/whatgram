import { check } from "express-validator";

const loginValidator = [check("email", "Invalid email").isEmail()];

export { loginValidator };
