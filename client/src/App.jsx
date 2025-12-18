import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  // Login,
  // Register,
  DashboardLayout,
  HomeLayout,
  Error,
  Help,
  System,
  InnerDashboard,
  Login,
  Register,
  BookingPage,
  BookingSuccess
  // Landing,
  // AddJob,
  // EditJob,
  // Stats,
  // Profile,
  // AllJobs,
  // Admin,
} from "./pages/index.js";
import { CheckTheme } from "./pages/dashboard.jsx";
// actions and loaders
// import { registerSubmit } from "./utils/register-submit.jsx";
import { Action as loginAction } from "./pages/login.jsx";
import { Action as registerAction } from "./pages/register.jsx";
import { Loader as DashboardLoader } from "./pages/dashboard.jsx";
import { Loader as registerLoader } from "./pages/register.jsx";
import { Loader as successLoader } from "./pages/BookingSuccess.jsx";
// import { addjobSubmit } from "./utils/addjob-submit.jsx";
// import { jobsLoader } from "./pages/alljobs.jsx";
// import { editjobSubmit } from "./utils/editjob-submit.jsx";
// import { EditjobLoader } from "./pages/editjob.jsx";
// import deletejobAction from "./pages/DeleteJob.jsx";
// import { AdminLoader } from "./pages/admin.jsx";
// import { ProfileAction } from "./pages/profile.jsx";
// import { StatsLoader } from "./pages/stats.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorElement from "./components/ErrorElement.jsx";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import ErrorElement from "./components/ErrorElement.jsx";
// check dark mood theme
CheckTheme();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5,
//     },
//   },
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        loader:registerLoader,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: DashboardLoader,
        children: [
          {
            index :true,
            element: <BookingPage />,
            // action: addjobSubmit(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "help",
            element: <Help />,
            // loader: StatsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "system",
            element: <System />,
            // loader: StatsLoader(queryClient),
            errorElement: <ErrorElement />,
          },{
            path: "booking-success/:id",
            element: <BookingSuccess />,
            loader:successLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "booking",
            element: <BookingPage />,
            // loader: StatsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
        ],
      },
      // {
      //   path: "/login",
      //   element: <Login />,
      //   action: loginSubmit(queryClient),
      // },

      // {
      //   path: "/dashboard",
      //   element: <DashboardLayout />,
      // loader: CurrentUserLoader(queryClient),
      // children: [
      //   {
      //     index: true,
      //     element: <AddJob />,
      //     action: addjobSubmit(queryClient),
      //     errorElement: <ErrorElement />,
      //   },
      //   {
      //     path: "stats",
      //     element: <Stats />,
      //     loader: StatsLoader(queryClient),
      //     errorElement: <ErrorElement />,
      //   },
      //   {
      //     path: "edit-job/:id",
      //     element: <EditJob />,
      //     action: editjobSubmit(queryClient),
      //     loader: EditjobLoader(queryClient),
      //     errorElement: <ErrorElement />,
      //   },
      //   {
      //     path: "delete-job/:id",
      //     action: deletejobAction(queryClient),
      //   },
      //   {
      //     path: "all-jobs",
      //     element: <AllJobs />,
      //     loader: jobsLoader(queryClient),
      //     errorElement: <ErrorElement />,
      //   },
      //   {
      //     path: "profile",
      //     element: <Profile />,
      //     action: ProfileAction(queryClient),
      //     errorElement: <ErrorElement />,
      //   },
      //   {
      //     path: "admin",
      //     element: <Admin />,
      //     loader: AdminLoader,
      //     errorElement: <ErrorElement />,
      //   },
      // ],
      // },
    ],
  },
]);

// const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// };

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
