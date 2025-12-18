import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import User from "../models/User.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorArray = errors.array();
        const first = errorArray[0];
        console.log(errorArray);

        const { msg, type } =
          typeof first.msg === "object"
            ? first.msg
            : { msg: first.msg, type: "VALIDATION_ERROR" };

        if (type === "NOT_FOUND") throw new NotFoundError(msg);
        if (type === "UNAUTHORIZED") throw new UnauthorizedError(msg);
        if (type === "VALIDATION_ERROR") {
          const allMessages = errorArray.map((err) =>
            typeof err.msg === "object" ? err.msg.msg : err.msg
          );
          throw new BadRequestError(allMessages);
        }

        throw new BadRequestError(msg);
      }
      next();
    },
  ];
};



export const validateIdParamFor = (Model, resourceName) =>
  withValidationErrors([
    param("id").custom(async (value, { req }) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return Promise.reject({
          msg: "invalid MongoDB id",
          type: "VALIDATION_ERROR",
        });
      }

      const doc = await Model.findById(value);
      if (!doc) {
        return Promise.reject({
          msg: `no ${resourceName} with id: ${value}`,
          type: "NOT_FOUND",
        });
      }
      req.resource = doc;
    }),
  ]);

export const validateRegisterInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage({ msg: "name is required", type: "VALIDATION_ERROR" }),
  body("email")
    .notEmpty()
    .withMessage({ msg: "email is required", type: "VALIDATION_ERROR" })
    .isEmail()
    .withMessage({ msg: "invalid email format", type: "VALIDATION_ERROR" })
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject({
          msg: "email already exists",
          type: "VALIDATION_ERROR",
        });
      }
    }),
  body("password")
    .notEmpty()
    .withMessage({ msg: "password is required", type: "VALIDATION_ERROR" })
    .isLength({ min: 8 })
    .withMessage({
      msg: "password must be at least 8 characters long",
      type: "VALIDATION_ERROR",
    }),

]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage({ msg: "email is required", type: "VALIDATION_ERROR" })
    .isEmail()
    .withMessage({ msg: "invalid email format", type: "VALIDATION_ERROR" }),
  body("password")
    .notEmpty()
    .withMessage({ msg: "password is required", type: "VALIDATION_ERROR" }),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage({ msg: "name is required", type: "VALIDATION_ERROR" }),
  body("email")
    .notEmpty()
    .withMessage({ msg: "email is required", type: "VALIDATION_ERROR" })
    .isEmail()
    .withMessage({ msg: "invalid email format", type: "VALIDATION_ERROR" })
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError({
          msg: "email already exists",
          type: "VALIDATION_ERROR",
        });
      }
    }),
  body("lastName")
    .notEmpty()
    .withMessage({ msg: "last name is required", type: "VALIDATION_ERROR" }),
]);

export const validateMachineInput = withValidationErrors([
  body("model")
    .notEmpty()
    .withMessage({ msg: "model is required", type: "VALIDATION_ERROR" }),
  body("aiVersion")
    .notEmpty()
    .withMessage({ msg: "AI version is required", type: "VALIDATION_ERROR" }),
  body("machineId")
    .notEmpty()
    .withMessage({ msg: "machine ID is required", type: "VALIDATION_ERROR" }),
]);
