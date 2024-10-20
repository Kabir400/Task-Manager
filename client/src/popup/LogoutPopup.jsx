import { useState } from "react";
import styles from "../css/popup.module.css";
import postRequest from "../utility/postRequest.js";
import { useNavigate } from "react-router-dom";
function LogoutPopup({ show, togglePopup }) {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const clickHandler = async () => {
    setIsPending(true);
    const result = await postRequest(
      `${import.meta.env.VITE_BASE_URL}/logout`,
      {}
    );

    setIsPending(false);
    if (result.suceess === true) {
      togglePopup();
      navigate("/login");
    }
  };

  if (!show) return null;

  return (
    <div className={styles.popupOverlay} onClick={togglePopup}>
      <div
        className={styles.smallPopupContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.PopupHeadingLarge}>
          Are you sure you want to logout?
        </h3>
        <div className={styles.PopupPrimaryBtnLarge} onClick={clickHandler}>
          {isPending ? "Logging Out..." : "Yes, Logout"}
        </div>
        <div className={styles.PopupCancelBtnLarge} onClick={togglePopup}>
          Cancel
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
