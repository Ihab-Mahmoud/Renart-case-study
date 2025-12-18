import { redirect } from "react-router-dom";
import fetch from "../utils/custom-axios.jsx";
import { toast } from "react-toastify";
export const registerSubmit = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    await fetch("/register", "post", data);
    toast.success("successfully registerated");
    return redirect("/login");
} catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
