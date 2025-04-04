//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//components
import style from "../css/dashboard.module.css";
import Sidebar from "../components/Sidebar.jsx";
import Card from "../components/Card.jsx";
import getRequest from "../utility/getRequest.js";
import Loader from "../components/Loader.jsx";
import EditTaskPopup from "../popup/EditTaskPopup.jsx";
import DeletePopup from "../popup/DeletePopup.jsx";
import formatName from "../utility/formatName.js";
import AddBoardPopup from "../popup/AddBoardPopup.jsx";
import { today } from "../utility/formatDate.js";

//popups
import CreateTaskPopup from "../popup/CreateTaskPopup.jsx";

//image
import people from "../assets/people.png";
import dropdown from "../assets/dropdownIcon.png";
import colapsIcon from "../assets/colaps.png";
import plus from "../assets/plus.png";

function Dashboard() {
  const [isFiler, setIsFilter] = useState(false);
  const [backlog, setBacklog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [isfetched, setIsFetched] = useState(false);
  const [isCreatePopup, setCreatePopup] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [reload, setReload] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [filter, setFilter] = useState("week");
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [addBoardPopup, setAddBoardPopup] = useState(false);

  const [colaps, setColaps] = useState({
    backlog: false,
    todo: false,
    done: false,
    progress: false,
  });

  const [editData, setEditData] = useState({
    title: "",
    priority: null,
    assignTo: null,
    dueDate: null,
    checkLists: [],
  });
  const [taskId, setTaskId] = useState("");

  const navigate = useNavigate();

  const toggleFilter = () => {
    setIsFilter(!isFiler);
  };

  const toggleCreatePopup = () => {
    setCreatePopup(!isCreatePopup);
  };

  const toggleEditPopup = () => {
    setIsEditPopup(!isEditPopup);
  };

  const toggleDeletePopup = () => {
    setIsDeletePopup(!isDeletePopup);
  };

  const toggleBoard = () => {
    setAddBoardPopup(!addBoardPopup);
  };
  //fetch tasks
  useEffect(() => {
    (async () => {
      const result = await getRequest(`${base_url}/task/${filter}`);
      if (result.status === 401) {
        navigate("/login");
        return;
      }

      if (result.suceess) {
        setName(result.data.name);
        setId(result.data._id);
        setBacklog(
          result.data.tasks.filter((task) => task.status === "BACKLOG")
        );
        setTodo(result.data.tasks.filter((task) => task.status === "TO-DO"));
        setInProgress(
          result.data.tasks.filter((task) => task.status === "PROGRESS")
        );
        setDone(result.data.tasks.filter((task) => task.status === "DONE"));
        setIsFetched(true);
      } else {
        setIsFetched(true);
        toast.error(result.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    })();
    setReload(false);
  }, [reload, filter]);

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
              <h3 className={style.addPeople} onClick={toggleBoard}>
                Add People
              </h3>
            </div>
          </div>

          {/*filter dropdown */}
          <div className={style.dropdownHeading} onClick={toggleFilter}>
            <p className={style.dropdownHeadingText}>
              {filter != "today" && "This"} {formatName(filter)}
            </p>
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
          <p
            className={style.filermenue}
            onClick={() => {
              setFilter("today");
              toggleFilter();
            }}
          >
            Today
          </p>
          <p
            className={style.filermenue}
            onClick={() => {
              setFilter("week");
              toggleFilter();
            }}
          >
            This week
          </p>
          <p
            className={style.filermenue}
            onClick={() => {
              setFilter("month");
              toggleFilter();
            }}
          >
            This Month
          </p>
        </div>

        {/* name and date */}

        <h3 className={style.dashboardName}>Welcome! {name}</h3>
        <h4 className={style.dashboardDate}>{today()}</h4>

        {/* task section */}

        <div className={style.taskContainer}>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>Backlog</h4>
              <div className={style.taskBoxUtilityBox}>
                <img
                  src={colapsIcon}
                  alt="colaps"
                  className={style.colapsIcon}
                  onClick={() =>
                    setColaps({ ...colaps, backlog: !colaps.backlog })
                  }
                />
              </div>
            </div>
            {!isfetched && backlog.length === 0 && <Loader />}
            {backlog.map((task, index) => {
              return (
                <Card
                  key={index}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                  toggleEditPopup={toggleEditPopup}
                  setEditData={setEditData}
                  taskId={task._id}
                  setReload={setReload}
                  setCopyToast={setCopyToast}
                  toggleDeletePopup={toggleDeletePopup}
                  setTaskId={setTaskId}
                  colaps={colaps.backlog}
                  id={id}
                  assignTo={task.assignTo}
                />
              );
            })}
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>To do</h4>
              <div className={style.taskBoxUtilityBox}>
                <img
                  src={plus}
                  alt="add todo"
                  className={style.addTodoIcon}
                  onClick={toggleCreatePopup}
                />
                <img
                  src={colapsIcon}
                  alt="colaps"
                  className={style.colapsIcon}
                  onClick={() => setColaps({ ...colaps, todo: !colaps.todo })}
                />
              </div>
            </div>
            {!isfetched && todo.length === 0 && <Loader />}
            {todo.map((task, index) => {
              return (
                <Card
                  key={index}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                  assignTo={task.assignTo}
                  toggleEditPopup={toggleEditPopup}
                  setEditData={setEditData}
                  taskId={task._id}
                  setReload={setReload}
                  setCopyToast={setCopyToast}
                  toggleDeletePopup={toggleDeletePopup}
                  setTaskId={setTaskId}
                  colaps={colaps.todo}
                  id={id}
                />
              );
            })}
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>In progress</h4>
              <div className={style.taskBoxUtilityBox}>
                <img
                  src={colapsIcon}
                  alt="colaps"
                  className={style.colapsIcon}
                  onClick={() =>
                    setColaps({ ...colaps, progress: !colaps.progress })
                  }
                />
              </div>
            </div>
            {!isfetched && inprogress.length === 0 && <Loader />}
            {inprogress.map((task, index) => {
              return (
                <Card
                  key={index}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                  toggleEditPopup={toggleEditPopup}
                  setEditData={setEditData}
                  taskId={task._id}
                  setReload={setReload}
                  setCopyToast={setCopyToast}
                  toggleDeletePopup={toggleDeletePopup}
                  setTaskId={setTaskId}
                  colaps={colaps.progress}
                  id={id}
                  assignTo={task.assignTo}
                />
              );
            })}
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>Done</h4>
              <div className={style.taskBoxUtilityBox}>
                <img
                  src={colapsIcon}
                  alt="colaps"
                  className={style.colapsIcon}
                  onClick={() => setColaps({ ...colaps, done: !colaps.done })}
                />
              </div>
            </div>
            {!isfetched && done.length === 0 && <Loader />}
            {done.map((task, index) => {
              return (
                <Card
                  key={index}
                  priority={task.priority}
                  title={task.title}
                  checkList={task.checkLists}
                  status={task.status}
                  dueDate={task.dueDate}
                  toggleEditPopup={toggleEditPopup}
                  setEditData={setEditData}
                  taskId={task._id}
                  setReload={setReload}
                  setCopyToast={setCopyToast}
                  toggleDeletePopup={toggleDeletePopup}
                  setTaskId={setTaskId}
                  colaps={colaps.done}
                  done={true}
                  id={id}
                  assignTo={task.assignTo}
                />
              );
            })}
          </div>
        </div>
      </div>
      {isCreatePopup && (
        <CreateTaskPopup
          show={isCreatePopup}
          togglePopup={toggleCreatePopup}
          setReload={setReload}
        />
      )}
      {isEditPopup && (
        <EditTaskPopup
          show={isEditPopup}
          togglePopup={toggleEditPopup}
          setReload={setReload}
          data={editData}
        />
      )}

      {isDeletePopup && (
        <DeletePopup
          show={isDeletePopup}
          togglePopup={toggleDeletePopup}
          setReload={setReload}
          taskId={taskId}
        />
      )}
      {AddBoardPopup && (
        <AddBoardPopup
          show={addBoardPopup}
          togglePopup={toggleBoard}
          array={[...todo, ...backlog, ...inprogress, ...done]}
        />
      )}

      {copyToast && <div className={style.copyToast}>Link Copied</div>}
    </div>
  );
}

export default Dashboard;
