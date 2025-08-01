import SideBar from "./SideBar";
import "./Admin.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { doLogout } from "../../redux/action/userAction";
import NavDropdown from "react-bootstrap/NavDropdown";
import PerfectScrollbar from "react-perfect-scrollbar";
import Language from "../Header/Language";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const scrollRef = useRef();
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (scrollRef.current && scrollRef.current._container) {
      scrollRef.current._container.scrollTop = 0;
    }
  }, [pathname]);

  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(doLogout());
      navigate("/");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars
            className="btn-collaps"
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="right-side">
            <Language />
            <NavDropdown title={t("admin.title1")} id="basic-nav-dropdown">
              <NavDropdown.Item>{t("admin.item1")}</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogOut()}>
                {t("admin.item2")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
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
