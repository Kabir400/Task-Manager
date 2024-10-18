import { useState } from "react";
import AuthImage from "../components/AuthImage";
import style from "../css/auth.module.css";

// images
import email from "../assets/email.png";
import password from "../assets/password.png";
import passwordHide from "../assets/passwordHide.png";
import passwordView from "../assets/passwordView.png";
import name from "../assets/name.png";

function Signup() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className={style.authContainer}>
      <AuthImage />
      <div className={style.authForm}>
        <h2 className={style.authTitle}>Register</h2>
        <form className={style.authFormBox}>
          {/* name */}
          <div className={style.authInputBox}>
            <input type="text" placeholder="Name" className={style.authInput} />
            <img src={name} alt="name" className={style.authInputIcon} />
          </div>
          {/* email */}
          <div className={style.authInputBox}>
            <input
              type="text"
              placeholder="Email"
              className={style.authInput}
            />
            <img src={email} alt="email" className={style.authInputIcon} />
          </div>
          {/* password */}
          <div className={style.authInputBox}>
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              className={style.authInput}
            />
            <img
              src={passwordShown ? passwordHide : passwordView}
              alt="password"
              className={style.authInputPasswordIcon}
              onClick={togglePasswordVisiblity}
            />
            <img
              src={password}
              alt="password"
              className={style.authInputIcon}
            />
          </div>

          {/* confirm password */}
          <div className={style.authInputBox}>
            <input
              type={passwordShown ? "text" : "password"}
              placeholder="Confirm Password"
              className={style.authInput}
            />
            <img
              src={passwordShown ? passwordHide : passwordView}
              alt="confirm password"
              className={style.authInputPasswordIcon}
              onClick={togglePasswordVisiblity}
            />
            <img
              src={password}
              alt="confirm password"
              className={style.authInputIcon}
            />
          </div>
        </form>
        <div className={style.authBtnPrimary}>Register</div>
        <p className={style.authSubtext}>Have an account ?</p>
        <div className={style.authBtnSecondary}>Log in</div>
      </div>
    </div>
  );
}

export default Signup;
