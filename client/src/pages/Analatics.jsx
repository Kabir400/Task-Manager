import React from "react";
import style from "../css/analatics.module.css";
import Sidebar from "../components/Sidebar";
function Analatics() {
  return (
    <div className={style.analaticsContainer}>
      <Sidebar />
      <div className={style.analaticsBox}></div>
    </div>
  );
}

export default Analatics;
