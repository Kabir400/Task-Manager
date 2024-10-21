//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components
import style from "../css/dashboard.module.css";
import Sidebar from "../components/Sidebar.jsx";
import Card from "../components/Card.jsx";
import getRequest from "../utility/getRequest.js";
import Loader from "../components/Loader.jsx";

//image
import people from "../assets/people.png";
import dropdown from "../assets/dropdownIcon.png";
import colaps from "../assets/colaps.png";
import plus from "../assets/plus.png";

function Dashboard() {
  const [isFiler, setIsFilter] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [isfetched, setIsFetched] = useState(false);

  const toggleFilter = () => {
    setIsFilter(!isFiler);
  };

  //fetch tasks
  useEffect(() => {
    (async () => {
      const result = await getRequest(`${base_url}/task/week`);
      if (result.suceess) {
        setAllTasks(result.data);
        setBacklog(result.data.filter((task) => task.status === "BACKLOG"));
        setTodo(result.data.filter((task) => task.status === "TO-DO"));
        setInProgress(result.data.filter((task) => task.status === "PROGRESS"));
        setDone(result.data.filter((task) => task.status === "DONE"));
        setIsFetched(true);
      } else {
        setIsFetched(true);
        toast.error(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    })();
  }, []);

  return (
    <div className={style.dashboardContainer}>
      {/* side navbar */}
      <Sidebar />
      {/* board */}
      <div className={style.boardContainer}>
        <div className={style.boardHeadingBox}>
          <div className={style.boardHeadingContainer}>
            <h3 className={style.boardHeading}>Board</h3>
            <div className={style.addpeopleContainer}>
              <img src={people} alt="logo" className={style.addPeopleIcon} />
              <h3 className={style.addPeople}>Add People</h3>
            </div>
          </div>

          {/*filter dropdown */}
          <div className={style.dropdownHeading} onClick={toggleFilter}>
            <p className={style.dropdownHeadingText}>This week</p>
            <img
              src={dropdown}
              alt="dropdown"
              className={`${style.dropdownIcon} ${
                isFiler ? style.FilterIconReverse : ""
              }`}
            />
          </div>
        </div>

        {/* filer popup */}
        <div
          className={`${style.filterPopup} ${isFiler ? style.Filtershow : ""}`}
        >
          <p className={style.filermenue}>Today</p>
          <p className={style.filermenue}>This week</p>
          <p className={style.filermenue}>This Month</p>
        </div>

        {/* name and date */}

        <h3 className={style.dashboardName}>Welcome! Kabir</h3>
        <h4 className={style.dashboardDate}>12th Jan, 2024</h4>

        {/* task section */}

        <div className={style.taskContainer}>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>Backlog</h4>
              <div className={style.taskBoxUtilityBox}>
                <img src={colaps} alt="colaps" className={style.colapsIcon} />
              </div>
            </div>
            {!isfetched && backlog.length === 0 && <Loader />}
            {backlog.map((task, index) => {
              return (
                <Card
                  key={task._id}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                />
              );
            })}
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>To do</h4>
              <div className={style.taskBoxUtilityBox}>
                <img src={plus} alt="add todo" className={style.addTodoIcon} />
                <img src={colaps} alt="colaps" className={style.colapsIcon} />
              </div>
            </div>
            {!isfetched && todo.length === 0 && <Loader />}
            {todo.map((task, index) => {
              return (
                <Card
                  key={task._id}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                />
              );
            })}
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>In progress</h4>
              <div className={style.taskBoxUtilityBox}>
                <img src={colaps} alt="colaps" className={style.colapsIcon} />
              </div>
            </div>
            {!isfetched && inprogress.length === 0 && <Loader />}
            {inprogress.map((task, index) => {
              return (
                <Card
                  key={task._id}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                />
              );
            })}
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>Done</h4>
              <div className={style.taskBoxUtilityBox}>
                <img src={colaps} alt="colaps" className={style.colapsIcon} />
              </div>
            </div>
            {!isfetched && done.length === 0 && <Loader />}
            {done.map((task, index) => {
              return (
                <Card
                  key={task._id}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
