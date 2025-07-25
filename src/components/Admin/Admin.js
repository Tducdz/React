import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const scrollRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollRef.current && scrollRef.current._container) {
      scrollRef.current._container.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <PerfectScrollbar containerRef={(ref) => (scrollRef.current = ref)}>
          <div className="admin-main">
            <Outlet />
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default Admin;
