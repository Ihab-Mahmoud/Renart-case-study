import { StatusCodes } from "http-status-codes";

const ErrorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Some thing went wrong",
  };
   
  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default ErrorHandler;
