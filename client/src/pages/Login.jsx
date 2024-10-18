import { useState } from "react";
import AuthImage from "../components/AuthImage";
import style from "../css/auth.module.css";

// images
import email from "../assets/email.png";
import password from "../assets/password.png";
import passwordHide from "../assets/passwordHide.png";
import passwordView from "../assets/passwordView.png";
function Login() {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className={style.authContainer}>
      <AuthImage />
      <div className={style.authForm}>
        <h2 className={style.authTitle}>Login</h2>
        <form className={style.authFormBox}>
          <div className={style.authInputBox}>
            <input
              type="text"
              placeholder="Email"
              className={style.authInput}
            />
            <img src={email} alt="email" className={style.authInputIcon} />
          </div>
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
        </form>
        <div className={style.authBtnPrimary}>Log in</div>
        <p className={style.authSubtext}>Have no account yet?</p>
        <div className={style.authBtnSecondary}>Register</div>
      </div>
    </div>
  );
}

export default Login;
