import { redirect } from "react-router-dom";
import fetch from "../utils/custom-axios.jsx";
import { toast } from "react-toastify";

export const editjobSubmit =
  (queryClient) =>
  async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      await fetch(`/jobs/${ params.id }`, "patch", data);
      queryClient.invalidateQueries(['stats']);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job Edited");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
