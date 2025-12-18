import express from "express";
import {
  validateRegisterInput,validateLoginInput
} from "../middlewares/validation.js";

import rateLimiter from "express-rate-limit";


// const apiLimiter = rateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10,
//   message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
// });
const router = express();


import { authenticateUser, authorizePermissions } from "../middlewares/auth.js";
import { Login,Register,Logout } from "../controllers/auth.js";

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").get(Logout);

export default router;
