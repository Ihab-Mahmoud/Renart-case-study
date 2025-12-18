import { NavLink } from "react-router-dom";
import { useGlobal } from "../utils/global-context";
const   NavLinks = ({ toggleSidebar, user, showSidebar, list, logoutUser }) => {
  const { page, setPage } = useGlobal();

  return (
    <div className="nav-links">
      {list?.map((link) => {
        const { text, path, icon } = link;
        // // admin user
        // if (text === "admin" && user?.role !== "admin") {
        //   return null;
        // }
        return showSidebar ? (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            end
            onClick={() => {
              setPage(text);
              if (text === "Logout") {
                logoutUser();
              }
            }}
          >
            <span className="icon">{icon}</span>
          </NavLink>
        ) : (
          <NavLink
            to={path}
            key={text}
            onClick={() => {
              setPage(text);
              toggleSidebar();
              if (text === "Logout") {
                logoutUser();
              }
            }}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
