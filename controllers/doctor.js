import { StatusCodes } from "http-status-codes";
import CLINIC from "../models/Clinic.js";
import USER from "../models/User.js";
import  cloudinary  from "cloudinary";
import { formatImage } from "../middlewares/multer.js";


export const getAllClinics = async (req, res, next) => {
  const data = await CLINIC.find();
  res.status(StatusCodes.OK).json({ data: data });
};


export const getDoctors = async (req, res, next) => {
  console.log(req.body);
  
  const data = await USER.find({clinicId:req.body.clinicId});
  console.log(data);
  
  res.status(StatusCodes.OK).json({ data: data });
};


export const AddClinic = async (req, res, next) => {
  const clinic = await CLINIC.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ clinic });
};