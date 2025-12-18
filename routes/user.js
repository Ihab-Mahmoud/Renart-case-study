import express from "express";
import { validateUpdateUserInput } from "../middlewares/validation.js";
import upload from "../middlewares/multer.js";

import { authorizePermissions } from "../middlewares/auth.js";
const router = express();

import {
  getCurrentUser,
  UpdateUser,
} from "../controllers/user.js";

router.route("/current-user").get(getCurrentUser);
router
  .route("/update-user")
  .patch(
    validateUpdateUserInput,
    UpdateUser
  );

export default router;
