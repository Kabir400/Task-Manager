//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useState, useRef, useEffect } from "react";
import style from "../css/card.module.css";
import { formatDate, checkDueDatePassed } from "../utility/formatDate.js";
import getRequest from "../utility/getRequest.js";
import putRequest from "../utility/putRequest.js";
import deleteRequest from "../utility/deleteRequest.js";
import { useNavigate } from "react-router-dom";
import { formatymd } from "../utility/formatDate.js";
import { toast } from "react-toastify";

//images
import arrowDown from "../assets/dropdown2.png";
import edit from "../assets/editDot.png";

function Card({
  priority,
  title,
  checkList,
  status,
  dueDate,
  assignTo,
  toggleEditPopup,
  setEditData,
  taskId,
  setReload,
  setCopyToast,
  toggleDeletePopup,
  setTaskId,
  colaps,
  done,
}) {
  //status list
  const statusList = ["TO-DO", "BACKLOG", "PROGRESS", "DONE"];

  const [show, setShow] = useState(false);
  const [initials, setInitials] = useState("");
  const [isDropdown, setIsDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [email, setEmail] = useState("");
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
          setEmail(result.data.email);
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

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (flag) {
      toggleDropdown(); //flag is for avoiding toggle dropdown in initial render
    }
    setFlag(true);
  }, [colaps]);

  //edit handler
  const editHandler = () => {
    setIsDropdown(!isDropdown);
    setEditData({
      title,
      priority,
      dueDate: formatymd(dueDate),
      email,
      checkLists: checkList,
      id: assignTo,
      taskId: taskId,
    });
    toggleEditPopup();
  };

  //change status
  const changeStatus = async (status) => {
    const result = await putRequest(`${base_url}/task/status`, {
      taskId,
      status,
    });
    if (result.status === 401) {
      navigate("/login");
    }

    if (result.suceess === false) {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    if (result.suceess === true) {
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setReload(true);
    }
  };

  //delete task
  const deleteTask = async () => {
    setTaskId(taskId);
    toggleDeletePopup();
  };

  //copy the url
  const shareHandler = () => {
    navigator.clipboard
      .writeText(`${base_url}/task/${taskId}`)
      .then(() => {
        setCopyToast(true);
        setTimeout(() => {
          setCopyToast(false);
        }, [3000]);
      })
      .catch((err) => {
        toast.error("Falied to copy the url", {
          position: "top-right",
          autoClose: 3000,
        });
      });

    setIsDropdown(!isDropdown);
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
            style={{ backgroundColor: done ? "#63C05B" : "" }}
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
                <div
                  className={style.progress}
                  key={index}
                  onClick={() => changeStatus(item)}
                >
                  {item}
                </div>
              );
            })}
        </div>
      </div>

      {/* edit */}
      <div className={style.editBox} onClick={() => setIsDropdown(!isDropdown)}>
        <img src={edit} alt="edit" className={style.editIcon} />
        <img src={edit} alt="edit" className={style.editIcon} />
        <img src={edit} alt="edit" className={style.editIcon} />
      </div>

      {/* edit-dropdown */}
      <div
        className={`${style.editDropdownBox} ${
          isDropdown ? style.show : style.hide
        }`}
      >
        <div className={style.editDropdownTitle} onClick={editHandler}>
          Edit
        </div>
        <div className={style.editDropdownTitle} onClick={shareHandler}>
          Share
        </div>
        <div
          className={`${style.editDropdownTitle} ${style.deleteTitle}`}
          onClick={deleteTask}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default Card;
