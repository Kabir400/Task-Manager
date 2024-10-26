import React, { useState } from "react";
import style from "../css/settings.module.css";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import putRequest from "../utility/putRequest.js";

//images
import email from "../assets/email.png";
import password from "../assets/password.png";
import passwordHide from "../assets/passwordHide.png";
import passwordView from "../assets/passwordView.png";
import name from "../assets/name.png";

function Setting() {
  const [view, setView] = useState(false);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const updateHandler = async () => {
    //validating if you try to update multiple things or not
    if (
      (value.name && value.email) ||
      (value.name && (value.oldPassword || value.newPassword)) ||
      (value.email && (value.oldPassword || value.newPassword))
    ) {
      toast.error("You can update one thing at a single time", {
        autoClose: 3000,
      });
      return;
    }

    setIsPending(true);
    //executing-->
    const result = await putRequest(
      `${import.meta.env.VITE_BASE_URL}/user/update`,
      value
    );
    if (result.status === 401) {
      navigate("/login");
      setIsPending(false);
    }

    if (result.suceess === false) {
      toast.error(result.message, {
        autoClose: 3000,
      });
      setIsPending(false);
    }
    if (result.suceess === true) {
      toast.success(result.message, {
        autoClose: 3000,
      });
      setIsPending(false);
      setValue({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
      });
    }
  };

  return (
    <div className={style.settingsBox}>
      <div className={style.settingsBoxContainer}>
        <h3 className={style.title}>Settings</h3>
        <div className={style.settingsInputBoxContainer}>
          <div className={style.settingsInputBox}>
            <input
              type="text"
              placeholder="Name"
              className={style.input}
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
            <img src={name} alt="Name" className={style.settingsLeftIcon} />
          </div>
          <div className={style.settingsInputBox}>
            <input
              type="email"
              placeholder="Update Email"
              className={style.input}
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
            <img src={email} alt="Email" className={style.settingsLeftIcon} />
          </div>
          <div className={style.settingsInputBox}>
            <input
              type={view ? "text" : "password"}
              placeholder="Password"
              className={style.input}
              value={value.oldPassword}
              onChange={(e) =>
                setValue({ ...value, oldPassword: e.target.value })
              }
            />
            <img
              src={password}
              alt="old password"
              className={style.settingsLeftIcon}
            />
            <img
              src={view ? passwordHide : passwordView}
              className={style.settingsRightIcon}
              onClick={() => setView(!view)}
            />
          </div>
          <div className={style.settingsInputBox}>
            <input
              type={view ? "text" : "password"}
              placeholder="New Password"
              className={style.input}
              value={value.newPassword}
              onChange={(e) =>
                setValue({ ...value, newPassword: e.target.value })
              }
            />
            <img
              src={password}
              alt="password"
              className={style.settingsLeftIcon}
            />
            <img
              src={view ? passwordHide : passwordView}
              className={style.settingsRightIcon}
              onClick={() => setView(!view)}
            />
          </div>
        </div>
        <div className={style.settingsBtn} onClick={updateHandler}>
          {isPending ? "Loading..." : "Update"}
        </div>
      </div>
    </div>
  );
}

export default Setting;
