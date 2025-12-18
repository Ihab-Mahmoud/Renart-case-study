import { StatusCodes } from "http-status-codes";
import USER from "../models/User.js";
import  cloudinary  from "cloudinary";
import { formatImage } from "../middlewares/multer.js";


export const getCurrentUser = async (req, res, next) => {
  const user = await USER.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user: user });
};

export const UpdateUser = async (req, res, next) => {
  const newUser = { ...req.body };
  delete newUser.password;
  await USER.findByIdAndUpdate(req.user.userId, newUser);
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
