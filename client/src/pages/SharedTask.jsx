//base url
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useEffect, useState } from "react";
import style from "../css/sharedTask.module.css";
import { useParams } from "react-router-dom";
import getRequest from "../utility/getRequest";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import { formatDate } from "../utility/formatDate.js";
import NotFound from "../components/NotFound.jsx";

//image--
import promanage from "../assets/promanage.png";

function SharedTask() {
  const { id } = useParams();
  const [task, setTask] = useState({
    checkLists: [],
    priority: "",
    title: "",
    dueDate: null,
  });
  const [isPendig, setIsPendig] = useState(false);
  const [count, setCount] = useState(0);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      setIsPendig(true);
      const response = await getRequest(`${base_url}/task/single/${id}`);
      if (response.suceess === false) {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setIsNotFound(true);
        setIsPendig(false);
        return;
      }

      if (response.suceess === true) {
        setTask(response.data);
        setIsPendig(false);
        const doneCount = response.data.checkLists.reduce(
          (acc, item) => acc + (item.status === true ? 1 : 0),
          0
        );
        setCount(doneCount);
      }
    })();
  }, [id]);

  const isValidDueDate =
    task?.dueDate && task?.dueDate !== "1970-01-01T00:00:00.000Z";

  if (isPendig) {
    return (
      <div className={style.loaderConteiner}>
        <Loader />;
      </div>
    );
  }

  return (
    <div className={style.sharedTaskContainer}>
      <div className={style.titleBox}>
        <img src={promanage} alt="logo" className={style.tileIcon} />
        <h3 className={style.title}>Pro Manage</h3>
      </div>
      {isNotFound ? (
        <NotFound />
      ) : (
        <div className={style.box}>
          <div className={style.boxPriority}>
            <div
              className={`${style.priorityIcon} ${
                style[task.priority.split(" ")[0]]
              }`}
            ></div>
            <p className={style.priorityText}>{task.priority}</p>
          </div>
          <h2 className={style.taskHeading}>{task.title}</h2>

          <p className={style.checkListTitle}>
            Checklist ({count}/{task.checkLists.length})
          </p>

          <div className={style.checkListContainer}>
            {task.checkLists.map((item, index) => {
              return (
                <div className={style.checkListBox} key={index}>
                  <input
                    type="checkbox"
                    readOnly
                    className={style.checkListCheckbox}
                    checked={item.status}
                  />
                  <p className={style.checkTask}>{item.title}</p>
                </div>
              );
            })}
          </div>

          {isValidDueDate && (
            <div className={style.dueDateContainer}>
              <p className={style.dueDateTitle}>Due Date</p>
              <div className={style.dueDateBtn}>{formatDate(task.dueDate)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SharedTask;
