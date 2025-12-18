import express from "express";


const router = express();

import {
  getAllSlots,createSlot,deleteSlot,EditSlot
} from "../controllers/TimeSlots-controller.js";

router
  .route("/")
  .get( getAllSlots)
  .post(createSlot);

router
  .route("/:id")
  .patch(
    EditSlot
  )
  .delete(
    deleteSlot
  );

export default router;
