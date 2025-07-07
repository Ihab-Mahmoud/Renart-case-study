import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Loader } from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
    loader: Loader,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
