import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import style from "../css/settings.module.css";

function Settings() {
  return (
    <div>
      <div className={style.settingsContainer}>
        <Sidebar />

        <div className={style.settingsBox}></div>
      </div>
    </div>
  );
}

export default Settings;
