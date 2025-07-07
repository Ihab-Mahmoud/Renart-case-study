import express from "express";

const router = express.Router();
import {
  getAllProducts,
} from "../controllers/product-controllers.js";



router.route("/get-all-products").get(getAllProducts);
export default router;
