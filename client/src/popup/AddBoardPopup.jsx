import { useEffect, useState } from "react";
import style from "../css/addBoard.module.css";
import postRequest from "../utility/postRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SubPopup from "../components/SubPopup";

function AddBoardPopup({ show, togglePopup, array }) {
  const [email, setEmail] = useState("");
  const [shared, setShared] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShared(false);
  }, []);

  const addBoardHandler = async () => {
    console.log(array);
    const filterArray = array.map((item) => {
      return {
        taskId: item._id,
        creatorId: item.createdBy,
        assignTo: item.assignTo,
      };
    });

    const result = await postRequest(
      `${import.meta.env.VITE_BASE_URL}/board`,
      {
        email: email,
        taskArr: filterArray,
      },
      "json"
    );

    console.log(result);
    if (result.status === 401) {
      navigate("/login");
    }

    if (result.suceess === false) {
      toast.error(result.message, {
        autoClose: 3000,
      });
    }
    if (result.status === 200) {
      setShared(!shared);
    }
  };

  if (!show) return null;

  return (
    <div className="popupOverlay" onClick={togglePopup}>
      {!shared ? (
        <div className={style.popupBox} onClick={(e) => e.stopPropagation()}>
          <p className={style.popupHeading}>Add people to the board</p>
          <input
            type="text"
            className={style.popupInput}
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={style.popupBtns}>
            <div className={style.popupCancelBtn} onClick={togglePopup}>
              Cancel
            </div>
            <div className={style.popupPrimaryBtn} onClick={addBoardHandler}>
              Add Email
            </div>
          </div>
        </div>
      ) : (
        <SubPopup email={email} togglePopup={togglePopup} />
      )}
    </div>
  );
}

export default AddBoardPopup;
