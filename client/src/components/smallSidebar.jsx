import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { FaTimes } from "react-icons/fa";
import { Logo, NavLinks } from "../components/index.js";
import { links, footerLinks } from "../utils/links.jsx";

// eslint-disable-next-line react/prop-types
const SmallSidebar = ({ showSidebar, toggleSidebar, user, logoutUser }) => {
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="footer">
            <NavLinks
              toggleSidebar={toggleSidebar}
              user={user}
              list={links}
              logoutUser={logoutUser}
            />
            <div>
              <hr></hr>
              <NavLinks
                toggleSidebar={toggleSidebar}
                user={user}
                list={footerLinks}
                logoutUser={logoutUser}
              />
            </div>
            <div className="footer-font">
              <h4>Guiss.ai</h4>
              <div>
                <span>Tradmark of Emayer Technology</span>
                <span>2024 All Rights Reserved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
