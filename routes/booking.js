import express from "express";
const router = express();
import { authenticateUser, authorizePermissions } from "../middlewares/auth.js";


import { createBooking,deleteBooking,getAllBookings,getSingleBooking ,EditBooking} from "../controllers/Booking-controller.js";

router
  .route("/")
  .get(getAllBookings)
  .post(authenticateUser,createBooking)
 

router
  .route("/:id")
  .get(getSingleBooking) 
  .patch(EditBooking)
  .delete(
    deleteBooking
  );

export default router;

