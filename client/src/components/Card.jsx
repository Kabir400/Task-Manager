//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useState, useRef, useEffect } from "react";
import style from "../css/card.module.css";
import { formatDate, checkDueDatePassed } from "../utility/formatDate.js";
import getRequest from "../utility/getRequest.js";
import { useNavigate } from "react-router-dom";

//images
import arrowDown from "../assets/dropdown2.png";

function Card({ priority, title, checkList, status, dueDate, assignTo }) {
  //status list
  const statusList = ["TO-DO", "BACKLOG", "PROGRESS", "DONE"];

  const [show, setShow] = useState(false);
  const [initials, setInitials] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Count completed tasks
  const completedTasks = checkList.filter(
    (item) => item.status === true
  ).length;

  // Total tasks
  const totalTasks = checkList.length;

  //fething the initials
  useEffect(() => {
    if (assignTo) {
      (async () => {
        const result = await getRequest(`${base_url}/getinitials/${assignTo}`);

        if (result.status === 401) {
          navigate("/login");
        }

        if (result.suceess === true) {
          setInitials(result.data.initials);
        }
      })();
    }
  }, [assignTo]);

  const CheckListItems = () => {
    return checkList.map((item, index) => {
      return (
        <div className={style.checkListDropdownContainer} key={index}>
          <input
            type="checkbox"
            checked={item.status}
            onChange={() => {}}
            className={style.checkListCheckbox}
          />
          <p className={style.checkListDropdownText}>{item.title}</p>
        </div>
      );
    });
  };

  const toggleDropdown = () => {
    const dropdown = dropdownRef.current;

    if (show) {
      // Collapse: Set height to 0
      dropdown.style.height = "0px";
    } else {
      // Expand: Set height to scrollHeight (actual height of content)
      dropdown.style.height = `${dropdown.scrollHeight}px`;
    }

    setShow(!show);
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.cardPriorityContainer}>
        <div
          className={`${style.cardPriorityIcon} ${
            priority === "HIGH PRIORITY"
              ? style.highPriority
              : priority === "LOW PRIORITY"
              ? style.lowPriority
              : priority === "MODERATE PRIORITY"
              ? style.moderatePriority
              : ""
          }`}
        ></div>
        <p className={style.cardPriorityText}>{priority}</p>
        {initials && (
          <div className={style.cardPriorityInitials}>{initials}</div>
        )}
      </div>
      <h3 className={style.cardTitle} title={title}>
        {title}
      </h3>
      <div className={style.cardCheckListContainer}>
        <h5 className={style.cardCheckListTitle}>
          Checklist ({completedTasks}/{totalTasks})
        </h5>
        <div className={style.dropdownContainer} onClick={toggleDropdown}>
          <img
            src={arrowDown}
            alt="Show Checklist"
            className={`${style.ChecklistDropdown} ${
              show ? style.rotateDropdown : ""
            }`}
          />
        </div>
      </div>

      <div
        ref={dropdownRef}
        className={`${style.dropdownItems}`}
        style={{
          height: show ? `${dropdownRef.current.scrollHeight}px` : "0px",
        }}
      >
        {CheckListItems()}
      </div>

      <div className={style.cardProgressContainer}>
        {dueDate ? (
          <div
            className={`${style.dueDate} ${
              checkDueDatePassed(dueDate) || priority === "HIGH PRIORITY"
                ? style.dueDateHighPriority
                : style.dueDateLowPriority
            }`}
          >
            {formatDate(dueDate)}
          </div>
        ) : (
          <div style={{ visibility: "hidden" }}></div>
        )}

        <div className={style.progressBox}>
          {statusList
            .filter((item) => item != status)
            .map((item, index) => {
              return (
                <div className={style.progress} key={index}>
                  {item}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Card;
