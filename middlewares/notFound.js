import { StatusCodes } from "http-status-codes";

const NotFoundError = (req, res, next) =>
  res.status(StatusCodes.NOT_FOUND).send("THIS ROOT DOES`t EXIST");

export default NotFoundError;
