import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import style from "../css/settings.module.css";
import Setting from "../components/Setting.jsx";

function Settings() {
  return (
    <div>
      <div className={style.settingsContainer}>
        <Sidebar />

        <Setting />
      </div>
    </div>
  );
}

export default Settings;
