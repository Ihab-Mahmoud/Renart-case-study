import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "cally";
import "react-calendar/dist/Calendar.css";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.css";

import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./utils/global-context.jsx";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
