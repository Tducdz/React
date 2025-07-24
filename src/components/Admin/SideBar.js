import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaGem, FaGithub } from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { MdDashboard } from "react-icons/md";
import { PiExamBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            onClick={() => navigate("/")}
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            className="pro-sidebar-header-text"
          >
            <PiExamBold size={"3em"} color={"00bfff"} />{" "}
            {!collapsed ? "TDucQuiz" : ""}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboard />}
              // suffix={<span className="badge red">New</span>}
            >
              Dashboard
              <Link to="/admins" />
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              icon={<FaGem />}
              title="Features"
            >
              <MenuItem>
                User Management
                <Link to="manage-users" />
              </MenuItem>
              <MenuItem>
                {" "}
                Manage Quiz Questions
                <Link to="manage-quizzes" />
              </MenuItem>
              <MenuItem>
                {" "}
                Manage Questions
                <Link to="manage-questions" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/Tducdz/React"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
              title="View Source"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              ></span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
      ;
    </>
  );
};

export default SideBar;
