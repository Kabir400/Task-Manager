//base url
const base_url = import.meta.env.VITE_BASE_URL;

import React, { useEffect, useRef, useState } from "react";
import style from "../css/taskPopup.module.css";
import { DateFormat } from "../utility/formatDate.js";
import getRequest from "../utility/getRequest.js";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";

//images
import plus from "../assets/plus.png";
import Delete from "../assets/Delete.png";
import postRequest from "../utility/postRequest.js";

function CreateTaskPopup({ show, togglePopup, reload, setReload }) {
  //veriables
  const dateRef = useRef(null);
  const [showDate, setShowDate] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownArr, setDropdownArr] = useState([]);
  const [assign, setAssign] = useState(null);
  const [dropdownLoader, setDropdownLoader] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  //value state
  const [value, setValue] = useState({
    title: "",
    priority: null,
    assignTo: null,
    dueDate: null,
    checkLists: [],
  });

  //priority handler
  const priorityHandler = (text) => {
    setValue({ ...value, priority: text });
  };

  //add to checklist
  const addCheckList = () => {
    setValue({
      ...value,
      checkLists: [...value.checkLists, { title: "", status: false }],
    });
  };

  //dropdown handler
  const dropDownHandler = async () => {
    setDropdown(!dropdown);
    setDropdownLoader(true);
    const result = await getRequest(`${base_url}/user/all`);
    setDropdownLoader(false);
    if (result.status === 401) {
      navigate("/login");
    }
    if (result.suceess === false) {
      toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setDropdown(false);
    }
    if (result.suceess === true) {
      if (result.data.length === 0) {
        toast.success("Currently, there is no user other than you", {
          position: "top-right",
          autoClose: 3000,
        });
        setDropdown(false);
        return;
      }
      setDropdownArr(result.data);
    }
  };

  // assign to handler
  const assignToHandler = (item) => {
    setValue({ ...value, assignTo: item._id });
    setAssign(item.email);
    setDropdown(false);
  };

  //create task function
  const createTask = async () => {
    //validationg checklist title in the fornted because some unexpected issue occured in the backend
    setIsPending(true);
    for (let i = 0; i < value.checkLists.length; i++) {
      if (value.checkLists[i].title === "") {
        toast.error("Please add checklist title", {
          position: "top-right",
          autoClose: 3000,
        });
        setIsPending(false);
        return;
      }
    }

    //create task request
    const data = await postRequest(`${base_url}/task/create`, value, "json");
    if (data.status === 401) {
      navigate("/login");
      setIsPending(false);
    }
    if (data.suceess === false) {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setIsPending(false);
    }
    if (data.suceess === true) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setReload(true);
      setIsPending(false);
      togglePopup();
    }
  };

  //calculating how many tasks are completed
  useEffect(() => {
    let count = 0;
    value.checkLists.forEach((item) => {
      if (item.status === true) {
        count++;
      }
    });
    setCompleted(count);
  }, [completed, value.checkLists]);

  if (!show) return null;

  return (
    <div className="popupOverlay" onClick={togglePopup}>
      <div className={style.popupBox} onClick={(e) => e.stopPropagation()}>
        {/* title */}
        <div className={style.popupTitleBox}>
          <p className={style.popupTitle}>
            Title <span className={style.popupStar}>*</span>
          </p>
          <input
            type="text"
            className={style.popupTitleInput}
            placeholder="Enter Task Title"
            value={value.title}
            onChange={(e) => {
              setValue({ ...value, title: e.target.value });
            }}
          />
        </div>

        {/* priority */}
        <div className={style.popupPriorityBox}>
          <p className={style.popupTitle}>
            Priority <span className={style.popupStar}>*</span>
          </p>
          <div
            className={`${style.popupPriorityBtn} ${
              value.priority === "HIGH PRIORITY" && style.popupPriorityBtnActive
            }`}
            onClick={() => priorityHandler("HIGH PRIORITY")}
          >
            <div className={style.highPriorityIcon}></div>
            <p className={style.popupPriorityText}>HIGH PRIORITY</p>
          </div>
          <div
            className={`${style.popupPriorityBtn} ${
              value.priority === "MODERATE PRIORITY" &&
              style.popupPriorityBtnActive
            }`}
            onClick={() => priorityHandler("MODERATE PRIORITY")}
          >
            <div className={style.moderatePriorityIcon}></div>
            <p className={style.popupPriorityText}>MODERATE PRIORITY</p>
          </div>
          <div
            className={`${style.popupPriorityBtn} ${
              value.priority === "LOW PRIORITY" && style.popupPriorityBtnActive
            }`}
            onClick={() => priorityHandler("LOW PRIORITY")}
          >
            <div className={style.lowPriorityIcon}></div>
            <p className={style.popupPriorityText}>LOW PRIORITY</p>
          </div>
        </div>

        {/* assignTo */}
        <div className={style.popupAssignToBox}>
          <p className={style.popupTitle} style={{ flexShrink: 0 }}>
            Assign To
          </p>

          <div
            className={style.popupAssignToDropDown}
            onClick={dropDownHandler}
          >
            {assign ? assign : "Add a assignee"}
          </div>
          {/* dropdown */}
          {dropdown && (
            <div className={style.dropdownContainer}>
              {dropdownLoader ? (
                <Loader />
              ) : dropdownArr.length > 0 ? (
                dropdownArr.map((item) => (
                  <div className={style.dropdownItemBox} key={item._id}>
                    <div className={style.dropdownItemInitials}>
                      {item.initials}
                    </div>
                    <div className={style.dropdownEmail}>{item.email}</div>
                    <div
                      className={style.dropdownBtn}
                      onClick={() => assignToHandler(item)}
                    >
                      Assign
                    </div>
                  </div>
                ))
              ) : (
                ""
              )}
            </div>
          )}
        </div>

        {/* Checklist title */}
        <p className={style.popupTitle}>
          Checklist ({completed}/{value.checkLists.length}){" "}
          <span className={style.popupStar}>*</span>
        </p>

        {/* checklist items */}
        <div className={style.checkListItems}>
          {value.checkLists.map((item, index) => {
            return (
              <div className={style.checkListItem} key={index}>
                <input
                  type="checkbox"
                  className={style.checkListCheckbox}
                  checked={item.status}
                  onChange={(e) => {
                    const updatedCheckLists = [...value.checkLists];
                    updatedCheckLists[index].status = e.target.checked;
                    setValue({ ...value, checkLists: updatedCheckLists });
                  }}
                />
                <input
                  type="text"
                  className={style.checkListInput}
                  placeholder="Type..."
                  value={item.title}
                  onChange={(e) => {
                    const updatedCheckLists = [...value.checkLists];
                    updatedCheckLists[index].title = e.target.value;
                    setValue({ ...value, checkLists: updatedCheckLists });
                  }}
                />
                <img
                  src={Delete}
                  alt="delete"
                  className={style.checkListDeteleIcon}
                  onClick={() => {
                    const updatedCheckLists = [...value.checkLists];
                    updatedCheckLists.splice(index, 1);
                    setValue({ ...value, checkLists: updatedCheckLists });
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* checklist add btn */}
        <div className={style.popupCheckListAddBtn} onClick={addCheckList}>
          <img src={plus} alt="ADD CHECKLIST" className={style.btnImg} />
          <p className={style.popupBtnText}>Add New</p>
        </div>

        {/* popup footer */}

        <div className={style.poupFooter}>
          <div
            className={style.popupSelectDueDate}
            onClick={() => {
              if (showDate) {
                dateRef.current.blur();
              } else {
                if (dateRef.current.showPicker) {
                  // Use showPicker if supported (Chrome, Edge)
                  dateRef.current.showPicker();
                } else {
                  // i think we don't need it, now probably firefox and shafari has showPicker but i am not sure -->it is tested on 3 browser crome, edge and firefox
                  dateRef.current.focus();
                }
              }
              setShowDate(!showDate);
            }}
          >
            {value.dueDate ? DateFormat(value.dueDate) : "Select Due Date"}
          </div>
          <input
            type="date"
            ref={dateRef}
            className={style.dateInput}
            onChange={(e) => {
              setValue({ ...value, dueDate: e.target.value });
              setShowDate(!showDate);
            }}
          />
          <div className={style.footerBtnBox}>
            <div className={style.cancelBtn} onClick={togglePopup}>
              Cancel
            </div>
            <div className={style.createTaskBtn} onClick={createTask}>
              {isPending ? "Loding..." : "Save"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTaskPopup;
