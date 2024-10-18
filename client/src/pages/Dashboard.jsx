import React from "react";
import style from "../css/dashboard.module.css";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard() {
  return (
    <div className={style.dashboardContainer}>
      {/* side navbar */}
      <Sidebar />
      {/* board */}
      <div className={style.boardContainer}></div>
    </div>
  );
}

export default Dashboard;
