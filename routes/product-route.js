import express from "express";

const router = express.Router();
import {
  getAllProducts,
} from "../controllers/product-controllers.js";



router.route("/doctors").get(getAllProducts);
export default router;
