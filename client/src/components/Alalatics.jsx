import React, { useEffect, useState } from "react";
import style from "../css/analatics.module.css";
import getRequest from "../utility/getRequest.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";

function Alalatics() {
  const navigate = useNavigate();
  const [isPendig, setIsPendig] = useState(false);
  const [obj, setObj] = useState({
    backlog: 0,
    done: 0,
    progress: 0,
    todo: 0,
    lowPriority: 0,
    moderatePriority: 0,
    highPriority: 0,
    dueDateTask: 0,
  });

  useEffect(() => {
    setIsPendig(true);
    (async () => {
      const result = await getRequest(
        `${import.meta.env.VITE_BASE_URL}/task/count`
      );
      if (result.status === 401) {
        navigate("/login");
        setIsPendig(false);
      }

      if (result.suceess === false) {
        toast.error(result.message, {
          autoClose: 3000,
        });
        setIsPendig(false);
      }
      if (result.suceess === true) {
        setIsPendig(false);
        setObj(result.data);
      }
    })();
  }, []);

  if (isPendig)
    return (
      <div className={style.loaderConteiner}>
        <Loader />;
      </div>
    );
  return (
    <div className={style.analaticsBox}>
      <h3 className={style.analaticsTitle}>Analytics</h3>

      <div className={style.analaticsBoxContainer}>
        <div className={style.box} style={{ marginLeft: "37px" }}>
          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>Backlog Tasks</p>
            </div>
            <p className={style.itemValue}>{obj.backlog}</p>
          </div>

          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>To-do Tasks</p>
            </div>
            <p className={style.itemValue}>{obj.todo}</p>
          </div>

          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>In-Progress Tasks</p>
            </div>
            <p className={style.itemValue}>{obj.progress}</p>
          </div>

          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>Completed Tasks</p>
            </div>
            <p className={style.itemValue}>{obj.done}</p>
          </div>
        </div>
        <div className={style.box}>
          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>Low Priority</p>
            </div>
            <p className={style.itemValue}>{obj.lowPriority}</p>
          </div>

          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>Moderate Priority</p>
            </div>
            <p className={style.itemValue}>{obj.moderatePriority}</p>
          </div>

          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>High Priority</p>
            </div>
            <p className={style.itemValue}>{obj.highPriority}</p>
          </div>

          <div className={style.item}>
            <div className={style.itemTitleBox}>
              <div className={style.itemIcon}></div>
              <p className={style.itemTitle}>Due Date Tasks</p>
            </div>
            <p className={style.itemValue}>{obj.dueDateTask}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alalatics;
