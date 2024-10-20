//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// toast
import { toast } from "react-toastify";

//components
import AuthImage from "../components/AuthImage";
import style from "../css/auth.module.css";
import postRequest from "../utility/postRequest.js";

// images
import email from "../assets/email.png";
import password from "../assets/password.png";
import passwordHide from "../assets/passwordHide.png";
import passwordView from "../assets/passwordView.png";
function Login() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  //submit handler........................
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);

    const data = new URLSearchParams(formData).toString();

    const result = await postRequest(`${base_url}/login`, data);

    if (result.suceess === true) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setIsPending(false);
      navigate("/");
    } else {
      setIsPending(false);
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  //.......................................................

  return (
    <div className={style.authContainer}>
      <AuthImage />
      <div className={style.authForm}>
        <h2 className={style.authTitle}>Login</h2>
        <form className={style.authFormBox} onSubmit={submitHandler}>
          <div className={style.authInputBox}>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className={style.authInput}
            />
            <img src={email} alt="email" className={style.authInputIcon} />
          </div>
          <div className={style.authInputBox}>
            <input
              name="password"
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
          <button type="submit" className={style.authBtnPrimary}>
            {isPending ? "Loading..." : "Log in"}
          </button>
        </form>
        <p className={style.authSubtext}>Have no account yet?</p>
        <Link to="/signup" className={style.authBtnSecondary}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
