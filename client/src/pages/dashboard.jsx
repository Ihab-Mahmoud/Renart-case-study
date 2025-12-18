import { useCallback, useEffect, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard.js";
import {
  Navbar,
  SmallSidebar,
  BigSidebar,
  Loading,
} from "../components/index.js";
import fetch, { customFetch } from "../utils/custom-axios.jsx";


export const Loader =  async () => {
  try {
    const { data } = await fetch("/user/current-user", "get");

    return data;
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

export const CheckTheme = () => {
  const check = localStorage.getItem("dark-theme") === "true";
  if (check) {
    document.body.classList.add("dark-theme");
  }
  return check;
};

const Dashboard = () => {
  const { data } = useLoaderData();
  // const queryClient = useLoaderData();
  const user = data?.user;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(CheckTheme);
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = async () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = useCallback(async () => {
    await fetch("/logout", "get");
    navigate("/");
  }, [navigate]);

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError, logoutUser]);

  return (
    <Wrapper>
      <main className="dashboard font-popping">
        <BigSidebar
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          user={user}
          logoutUser={logoutUser}
        />
        <SmallSidebar
          toggleSidebar={toggleSidebar}
          showSidebar={showSidebar}
          user={user}
          logoutUser={logoutUser}
        />
        <div>
          <div className="z-50 top-0 sticky">
            <Navbar
              toggleSidebar={toggleSidebar}
              logoutUser={logoutUser}
              user={user}
              toggleDarkTheme={toggleDarkTheme}
              isDarkTheme={isDarkTheme}
            />
          </div>
     
     
          <div  className="dashboard-page font-popping"  >

            {isLoading ? <Loading /> : <Outlet context={{ user }} />}
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Dashboard;
