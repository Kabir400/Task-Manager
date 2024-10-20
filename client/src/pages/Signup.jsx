//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//components
import AuthImage from "../components/AuthImage";
import style from "../css/auth.module.css";
import postRequest from "../utility/postRequest.js";
import useVerify from "../cutomHook/useVerify.jsx"; //custom hook

// images
import email from "../assets/email.png";
import password from "../assets/password.png";
import passwordHide from "../assets/passwordHide.png";
import passwordView from "../assets/passwordView.png";
import name from "../assets/name.png";

function Signup() {
  //if logged in move to the home page
  useVerify();

  //variables
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPending, setIsPending] = useState(false);

  //utility functions
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  //submit handler........................
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.target);

    // Get values from formData
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Check if password and confirm password correct
    if (password !== confirmPassword) {
      setIsPending(false);
      toast.error("Password and confirm password should be same!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Remove confirmPassword from formData
    formData.delete("confirmPassword");

    const data = new URLSearchParams(formData).toString();

    const result = await postRequest(`${base_url}/signup`, data);

    if (result.suceess === true) {
      toast.success("Your account created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsPending(false);
      navigate("/login");
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
        <h2 className={style.authTitle}>Register</h2>
        <form className={style.authFormBox} onSubmit={submitHandler}>
          {/* name */}
          <div className={style.authInputBox}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className={style.authInput}
            />
            <img src={name} alt="name" className={style.authInputIcon} />
          </div>
          {/* email */}
          <div className={style.authInputBox}>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className={style.authInput}
            />
            <img src={email} alt="email" className={style.authInputIcon} />
          </div>
          {/* password */}
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

          {/* confirm password */}
          <div className={style.authInputBox}>
            <input
              name="confirmPassword"
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
          <button type="submit" className={style.authBtnPrimary}>
            {isPending ? "Loding..." : "Register"}
          </button>
        </form>
        <p className={style.authSubtext}>Have an account ?</p>
        <Link to="/login" className={style.authBtnSecondary}>
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Signup;
