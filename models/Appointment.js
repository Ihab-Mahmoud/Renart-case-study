import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/password.js";
import { createJWT } from "../utils/jwt-token.js";

const UserSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
   slotId: {
      type: mongoose.Types.ObjectId,
      ref: "TimeSlots",
    },
  date:Date,
  time:Date,
},{ timestamps: true }


);


export default mongoose.model("Appointment", UserSchema);