import { redirect } from "react-router-dom";
import fetch from "../utils/custom-axios.jsx";
import { toast } from "react-toastify";
export const loginSubmit =
  (queryClient) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      await fetch("/login", "post", data);
      // queryClient.invalidateQueries(["currentUser"]);
      // toast.success("successfully loged in");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
