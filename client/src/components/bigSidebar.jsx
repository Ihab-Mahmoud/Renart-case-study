import Wrapper from "../assets/wrappers/BigSidebar.js";
import { Logo, NavLinks } from "../components/index.js";
import { links, footerLinks } from "../utils/links.jsx";

const BigSidebar = ({ toggleSidebar, showSidebar, user, logoutUser }) => {
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            {/* <Logo /> */}
          </header>
          <NavLinks
            toggleSidebar={toggleSidebar}
            user={user}
            showSidebar={showSidebar}
            list={links}
            logoutUser={logoutUser}
          />
        </div>
        <div className="footer">
          <div>
            <hr></hr>
            <NavLinks
              toggleSidebar={toggleSidebar}
              user={user}
              showSidebar={showSidebar}
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
    </Wrapper>
  );
};

export default BigSidebar;
