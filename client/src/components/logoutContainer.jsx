/* eslint-disable react/prop-types */
import { useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer.js";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";


const LogoutContainer = ({ user, logoutUser }) => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <button
        onClick={() => setShowLogout(!showLogout)}
        type="button"
        className="btn logout-btn"
      >
        {user?.avatar? (
          <img src={user.avatar} alt={user.name} className="img" />
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button
          type="button"
          className="btn dropdown-btn"
          onClick={logoutUser}
        >Log out</button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
