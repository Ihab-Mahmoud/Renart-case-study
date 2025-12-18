import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import logo from "../assets/icons/drawer_logo.jpg";
import { MdLock } from "react-icons/md";
import { Await, Form, redirect, useActionData, useNavigate } from "react-router-dom";
import fetch from "../utils/custom-axios";
import { MdModelTraining } from "react-icons/md";
import { PiVoicemailBold } from "react-icons/pi";
import { BsPassFill } from "react-icons/bs";
import { PiBrainFill } from "react-icons/pi";
import axios from "axios";

export const Loader = async () => {
  try {
    const { data } = await fetch("/user/current-user", "get");
    if (data?.user?.role != "superadmin") {
      return ;
    }
    return data;
  } catch (error) {
    console.log(error);
    return ;
  }
};

export const Action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(data);
    const user = await fetch("/register", "post", data);
    
    // console.log(user,machine);

    // queryClient.invalidateQueries(["currentUser"]);
    return redirect("/");
  } catch (error) {
    return error;
  }
};

const Register = () => {
  const navigate = useNavigate();

  const [clinics, setClinics] = useState([]);
  const data = useActionData();
    const [role, setRole] = useState("");
  console.log(data);
  /* ---------- Fetch clinics ---------- */
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get("/api/v1/doctor");
        console.log(res);
        
        setClinics(res.data.data || []);
      } catch (err) {
        console.error("Error fetching clinics", err);
        setClinics([]);
      }
    };
    fetchClinics();
  }, []);
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <Form method="post" className="flex flex-col gap-4 w-5/6 lg:w-2/5">
        <div className="flex justify-center ">
          <img src={logo} className="w-80" />
        </div>


        <div className="flex justify-between gap-3 relative lg:flex-row flex-col">
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <FaUser className="text-black text-lg" />
              <input
                name="name"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="text"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <PiVoicemailBold className="text-black text-lg" />
              <input
                name="email"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white "
                type="email"
                placeholder="Email"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-3 relative lg:flex-row flex-col">
        <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <select
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
        </div>
           <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <MdLock className="text-black text-2xl" />
              <input
                name="password"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
        </div>

        {role === "doctor" && (
        <div className="flex justify-between gap-3 relative lg:flex-row flex-col">
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <BsPassFill className="text-black text-2xl" />
              <input
                name="room"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="number"
                placeholder="Room number"
                required
              />
            </div>
          </div>
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <PiBrainFill className="text-black text-2xl" />
              <select
                name="clinicId"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="text"
                placeholder="Clinic"
                required
              >
              {clinics?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
              </select>
            </div>
          </div>
        </div>
        )}


          {role === "patient" && (
        <div className="flex justify-between gap-3 relative lg:flex-row flex-col">
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <MdModelTraining className="text-black text-2xl" />
              <input
                name="telephone"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="Number"
                placeholder="Telephone number"
                required
              />
            </div>
          </div>
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <PiBrainFill className="text-black text-2xl" />
              <input
                name="birth"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="Date"
                placeholder="Birth Date"
                required
              />
            </div>
          </div>
        </div>
          )}

        <button
          type="submit"
          className="rounded-xl p-3 border border-white bg-black text-white font-popping hover:bg-neutral-900"
        >
          Register
        </button>
          <button
      type="button"
      onClick={() => navigate("/")}
      className="rounded-xl p-3 border border-white bg-black text-white font-popping hover:bg-neutral-900"
    >
      Login
    </button>
        {data?.response?.data.msg && (
          <div
            id="passwordHelpBlock"
            className="form-text text-red-300 font-light mt-1 text-sm "
          >
            {data?.response?.data.msg}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Register;
