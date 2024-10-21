import { useState, useRef } from "react";
import style from "../css/card.module.css";

//images
import arrowDown from "../assets/dropdown2.png";

function Card({ priority, title, checkList, status, dueDate }) {
  //status list
  const statusList = ["TO-DO", "BACKLOG", "PROGRESS", "DONE"];

  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  // Count completed tasks
  const completedTasks = checkList.filter(
    (item) => item.status === true
  ).length;

  // Total tasks
  const totalTasks = checkList.length;

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
            "HIGH PRIORITY"
              ? style.highPriority
              : "LOW PRIORITY"
              ? style.lowPriority
              : "MODERATE PRIORITY"
              ? style.moderatePriority
              : ""
          }`}
        ></div>
        <p className={style.cardPriorityText}>{priority}</p>
      </div>
      <h3 className={style.cardTitle}>{title}</h3>
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
        <div className={`${style.dueDate} ${style.dueDateHighPriority}`}>
          {dueDate}
        </div>
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
