import express from "express";

const router = express();


import { AddClinic, getAllClinics,getDoctors } from "../controllers/doctor.js";


router
  .route("/")
  .get(getAllClinics)
  .post(
    AddClinic
  );


router
  .route("/doctor")
  .post(getDoctors)
  

// router
//   .route("/:id")
//   .get(validateIdParamFor(MACHINE, "Machine"), getSingleMachine)
//   .patch(
//     authenticateUser,
//     authorizePermissions("superadmin"),
//     validateIdParamFor(MACHINE, "Machine"),
//     validateMachineInput,
//     EditMachine
//   )
//   .delete(
//     authenticateUser,
//     authorizePermissions("superadmin"),
//     validateIdParamFor(MACHINE, "Machine"),
//     deleteMachine
//   );


export default router;
