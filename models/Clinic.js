import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/password.js";
import { createJWT } from "../utils/jwt-token.js";

const UserSchema = new mongoose.Schema({
  name:String,
  description:String,
},{ timestamps: true });


export default mongoose.model("Clinic", UserSchema);