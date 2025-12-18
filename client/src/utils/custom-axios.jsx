import axios from "axios";

export const customFetch = axios.create({
  baseURL: "/api/v1",
});


const fetch = async (url, method, inputdata) =>
{
  if (method === "post")
  {
    const data = await customFetch.post(url, inputdata);
    return data.data
  } else if (method === "get")
  {
    const data = await customFetch.get(url);
    return data
  } else if (method === "patch")
  {
    const data = await customFetch.patch(url, inputdata);
    return data.data
  } else
  {
    const data = await customFetch.delete(url);
    return data.data
  }

}
export default fetch;












