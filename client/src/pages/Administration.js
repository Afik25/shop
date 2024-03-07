import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "../routes/NavLink";
import {
  MdOutlineDashboard,
  IoCubeOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
  IoHelp,
  FiUsers,
  FiUser,
  FiLogOut,
  BiEnvelope,
  BiChevronDown,
  BiChevronUp,
} from "../middlewares/icons";
import useLogout from "../hooks/context/hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../utils/utils";

const Administration = () => {
  const [option, setOption] = useState(false);

  // logout
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  //
  const dispatch = useDispatch();
  const connectedUser = useSelector(
    (state) => state.setInitConf.initConnectedUser.connectedUserData
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shop - Administration</title>
        <meta name="description" content="Grow Up your business with SHOP." />
        <meta name="keywords" content="admin, user" />
      </Helmet>
      <div className="user">
        <div className="left">
          <div className="header">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="orga-logo" />
            <h2 className="title t-3">Entity type</h2>
          </div>
          <div className="body">
            <div className="navigation">
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin"
                exact={true}
              >
                <MdOutlineDashboard className="option-icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/sales"
              >
                <IoCubeOutline className="option-icon" />
                <span>Sales</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/hr"
              >
                <FiUsers className="option-icon" />
                <span>Human Ressources</span>
              </NavLink>
              <NavLink
                activeClassName="active-option"
                inactiveClassName="inactive-option"
                className="link-option"
                to="/admin/configuration"
              >
                <IoSettingsOutline className="option-icon" />
                <span>Configuration</span>
              </NavLink>
            </div>
          </div>
          <div className="footer">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="footer-pic" />
            <p className="title t-3">V.1.1.0</p>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <div className="options display-flex">
              <div className="option">
                <IoNotificationsOutline className="icon-element" />
                <span></span>
              </div>
              <div className="option">
                <BiEnvelope className="icon-element" />
                <span></span>
              </div>
              <div className="profile">
                <div
                  className="profile-item display-flex align-items-center"
                  onClick={() => setOption(!option)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="option">
                    <img
                      src={
                        !connectedUser?.userInfo?.thumbnails
                          ? process.env.PUBLIC_URL + "/user.png"
                          : `http://localhost:5500/${connectedUser?.userInfo?.thumbnails}`
                      }
                      alt="user-profile"
                    />
                  </div>
                  <div>
                    <h3 className="title t-2">
                      {connectedUser?.userInfo?.prename +
                        " " +
                        connectedUser?.userInfo?.name}
                    </h3>
                    <p className="t-3">{connectedUser?.userInfo?.role}</p>
                  </div>
                  {option ? (
                    <BiChevronUp className="icon" />
                  ) : (
                    <BiChevronDown className="icon" />
                  )}
                </div>
                <div
                  className={option ? "profile-item display" : "profile-item"}
                >
                  <Link to="" className="nav-link">
                    <FiUser className="icon" />
                    <span>Profile</span>
                  </Link>
                  <Link to="" className="nav-link">
                    <IoHelp className="icon" />
                    <span>Help</span>
                  </Link>
                  <div className="nav-link" onClick={signOut}>
                    <FiLogOut className="icon" />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Administration;
