import React from "react";
import style from "../css/subPopup.module.css";

function SubPopup({ email, togglePopup }) {
  return (
    <div className={style.subPopupContainer}>
      <p className={style.popupTitle}>{email} added to board</p>
      <div className={style.popupBtn} onClick={togglePopup}>
        Okay, got it!
      </div>
    </div>
  );
}

export default SubPopup;
