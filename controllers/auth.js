import * as dotenv from "dotenv";
dotenv.config();
import { UnauthenticatedError } from "../errors/customErrors.js";
import USER from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/password.js";


export const Login = async (req, res, next) => {
  const hashedPassword = await hashPassword( req.body.password);
  console.log(hashedPassword);
  
  const user = await USER.findOne({ email: req.body.email });
  if (!user) {
    throw new UnauthenticatedError("Wrong credentials");
  }
  const isPasswordMatch = await user.Compare(req.body.password);
  if (isPasswordMatch) {
    const token = await user.CreateToken();
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(StatusCodes.OK).json({ msg: "user logged in" });
  }
  throw new UnauthenticatedError("Wrong credentials");
};

export const Register = async (req, res, next) => {
  
  const isFirstUser = (await USER.countDocuments()) === 0;
  const user = await USER.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ user });
};

export const Logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
