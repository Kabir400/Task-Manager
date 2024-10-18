import React from "react";
import authImage from "../assets/loginImg.png";
import imageBorder from "../assets/imageBorder.png";
import style from "../css/auth.module.css";

function AuthImage() {
  return (
    <div className={style.authImageContainer}>
      <div className={style.imageFlexContainer}>
        <div className={style.authImageBox}>
          <img
            src={authImage}
            alt="AuthImage"
            className={style.authMainImage}
          />
          <img
            src={imageBorder}
            alt="AuthImageBorder"
            className={style.authImageBorder}
          />
        </div>
        <div className={style.authImageTextBox}>
          <h3 className={style.authImageTitle}>Welcome aboard my friend</h3>
          <p className={style.authImageText}>
            just a couple of clicks and we start
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthImage;
