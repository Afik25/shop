import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "../../routes/NavLink";

const Configuration = () => {
  return (
    <div className="configuration">
      <div className="head">
        <h2 className="title t-2">Configuration</h2>
        <p className="title t-3">
          Configure all necessaire options and stuff that will allow to
          manage...
        </p>
        <div className="navs">
          <NavLink
            activeClassName="active-option"
            inactiveClassName="inactive-option"
            className="link-option"
            to="/admin/configuration"
            exact={true}
          >
            {/* <MdOutlineDashboard className="option-icon" /> */}
            <span>Article</span>
          </NavLink>
          <NavLink
            activeClassName="active-option"
            inactiveClassName="inactive-option"
            className="link-option"
            to="/admin/configuration/partner"
          >
            {/* <HiOutlineDocumentDuplicate className="option-icon" /> */}
            <span>Partnership (customers & providers)</span>
          </NavLink>
          <NavLink
            activeClassName="active-option"
            inactiveClassName="inactive-option"
            className="link-option"
            to="/admin/configuration/extension"
          >
            {/* <MdOutlineDashboard className="option-icon" /> */}
            <span>Extensions</span>
          </NavLink>
          <NavLink
            activeClassName="active-option"
            inactiveClassName="inactive-option"
            className="link-option"
            to="/admin/configuration/subscription"
          >
            {/* <MdOutlineDashboard className="option-icon" /> */}
            <span>Subscriptions & Plans</span>
          </NavLink>
          <NavLink
            activeClassName="active-option"
            inactiveClassName="inactive-option"
            className="link-option"
            to="/admin/configuration/modules"
          >
            {/* <MdOutlineDashboard className="option-icon" /> */}
            <span>Modules</span>
          </NavLink>
        </div>
      </div>
      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default Configuration;
