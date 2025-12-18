import React from "react";
import { FaUser } from "react-icons/fa";
import logo from "../assets/icons/drawer_logo.jpg";
import { MdLock } from "react-icons/md";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import fetch from "../utils/custom-axios";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiPassportFill } from "react-icons/ri";
import { useGlobal } from "../utils/global-context";

export const Action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await fetch("/login", "post", data);
    // queryClient.invalidateQueries(["currentUser"]);
    return redirect("/dashboard");
  } catch (error) {
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const data = useActionData();
    const { page, setPage } = useGlobal();
  
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <Form method="post" className="flex flex-col gap-4 w-5/6 lg:w-96">
        <div className="flex justify-center ">
            <img src={logo} className="w-80" />
        </div>
        <div>
          <div className="relative flex items-center rounded-xl bg-white px-3">
            <MdOutlineAlternateEmail className="text-black text-lg" />
            <input
              name="email"
              className="p-4 w-full rounded-xl focus:outline-none text-black"
              type="email"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div>
          <div className="relative flex items-center rounded-xl bg-white px-3">
            <MdLock className="text-black text-2xl" />
            <input
              name="password"
              className="p-4 w-full rounded-xl focus:outline-none text-black"
              type="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
   
        <button
        onClick={()=>{setPage("Dashboard")}}
          type="submit"
          className="rounded-xl p-3 border border-white bg-black text-white font-popping hover:bg-neutral-900"
        >
          Login
        </button>
        <button
      type="button"
      onClick={() => navigate("/register")}
      className="rounded-xl p-3 border border-white bg-black text-white font-popping hover:bg-neutral-900"
    >
      Register
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

export default Login;
