//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useState } from "react";
import styles from "../css/popup.module.css";
import { useNavigate } from "react-router-dom";
import deleteRequest from "../utility/deleteRequest.js";
import { toast } from "react-toastify";

function LogoutPopup({ show, togglePopup, taskId, setReload }) {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const clickHandler = async () => {
    setIsPending(true);

    const result = await deleteRequest(`${base_url}/task/delete`, {
      taskId,
    });
    if (result.status === 401) {
      navigate("/login");
    }

    if (result.suceess === false) {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      togglePopup();
    }
    if (result.suceess === true) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setIsPending(false);
      setReload(true);
      togglePopup();
    }
  };

  if (!show) return null;

  return (
    <div className="popupOverlay" onClick={togglePopup}>
      <div
        className={styles.smallPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.PopupHeadingLarge}>
          Are you sure you want to Delete?
        </h3>
        <div className={styles.PopupPrimaryBtnLarge} onClick={clickHandler}>
          {isPending ? "Romoving..." : "Yes, Delete"}
        </div>
        <div className={styles.PopupCancelBtnLarge} onClick={togglePopup}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
