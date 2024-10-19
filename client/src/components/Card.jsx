import { useState, useRef } from "react";
import style from "../css/card.module.css";

//checkList arr
const checkListArr = [
  "this is a random task",
  "go eat samosas",
  "make the best ever samosas",
  // Add more tasks here
];

//images
import arrowDown from "../assets/dropdown2.png";

function Card() {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const CheckListItems = () => {
    return checkListArr.map((item, index) => {
      return (
        <div className={style.checkListDropdownContainer} key={index}>
          <input type="checkbox" className={style.checkListCheckbox} />
          <p className={style.checkListDropdownText}>{item}</p>
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
          className={`${style.cardPriorityIcon} ${style.highPriority}`}
        ></div>
        <p className={style.cardPriorityText}>HIGH PRIORITY</p>
      </div>
      <h3 className={style.cardTitle}>Hero section</h3>
      <div className={style.cardCheckListContainer}>
        <h5 className={style.cardCheckListTitle}>Checklist (0/3)</h5>
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
          Feb 10th
        </div>
        <div className={style.progressBox}>
          <div className={style.progress}>PROGRESS</div>
          <div className={style.progress}>TO-DO</div>
          <div className={style.progress}>DONE</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
