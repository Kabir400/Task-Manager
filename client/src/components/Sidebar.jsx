import React from "react";
import style from "../css/nav.module.css";
import { Link, useLocation } from "react-router-dom";

//images
import board from "../assets/board.png";
import promanage from "../assets/promanage.png";
import settings from "../assets/settings.png";
import analatics from "../assets/analatics.png";
import logout from "../assets/Logout.png";

function Sidebar() {
  const location = useLocation();

  return (
    <div className={style.sidebarContainer}>
      <div className={style.sidebarHeading}>
        <img src={promanage} alt="logo" className={style.sidebarTileIcon} />
        <h3 className={style.sidebarTitle}>Pro Manage</h3>
      </div>
      <div className={style.sidebarMenueBox}>
        <Link
          to={"/"}
          className={` ${location.pathname === "/" ? style.activeLink : ""} ${
            style.sidebarMenueTitleContainer
          }`}
        >
          <div className={style.sidebarMenueTitleBox}>
            <img src={board} alt="logo" className={style.sidebarMenueIcon} />
            <h3
              className={`${style.sidebarMenueTitle}${
                location.pathname === "/" ? style.activeTitle : ""
              }`}
            >
              Board
            </h3>
          </div>
        </Link>
        <Link
          to={"/analatics"}
          className={` ${
            location.pathname === "/analatics" ? style.activeLink : ""
          } ${style.sidebarMenueTitleContainer}`}
        >
          <div className={style.sidebarMenueTitleBox}>
            <img
              src={analatics}
              alt="logo"
              className={style.sidebarMenueIcon}
            />
            <h3
              className={`${style.sidebarMenueTitle} ${
                location.pathname === "/analatics" ? style.activeTitle : ""
              }`}
            >
              Analytics
            </h3>
          </div>
        </Link>
        <Link
          to={"/settings"}
          className={` ${
            location.pathname === "/settings" ? style.activeLink : ""
          } ${style.sidebarMenueTitleContainer}`}
        >
          <div className={style.sidebarMenueTitleBox}>
            <img src={settings} alt="logo" className={style.sidebarMenueIcon} />
            <h3
              className={`${style.sidebarMenueTitle}${
                location.pathname === "/settings" ? style.activeTitle : ""
              }`}
            >
              Settings
            </h3>
          </div>
        </Link>
      </div>

      <div className={style.logoutBox}>
        <img src={logout} alt="logo" className={style.logoutIcon} />
        <h3 className={style.logoutTitle}>Log out</h3>
      </div>
    </div>
  );
}

export default Sidebar;
