import React from "react";
import style from "../css/analatics.module.css";
import Sidebar from "../components/Sidebar";
import Alalatics from "../components/Alalatics";
function Analatics() {
  return (
    <div className={style.analaticsContainer}>
      <Sidebar />
      <Alalatics />
    </div>
  );
}

export default Analatics;
