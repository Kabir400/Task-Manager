import { useState } from "react";
import style from "../css/dashboard.module.css";
import Sidebar from "../components/Sidebar.jsx";
import Card from "../components/Card.jsx";

//image
import people from "../assets/people.png";
import dropdown from "../assets/dropdownIcon.png";
import colaps from "../assets/colaps.png";
import plus from "../assets/plus.png";

function Dashboard() {
  const [isFiler, setIsFilter] = useState(false);

  const toggleFilter = () => {
    setIsFilter(!isFiler);
  };

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
            <Card />
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
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>In progress</h4>
              <div className={style.taskBoxUtilityBox}>
                <img src={colaps} alt="colaps" className={style.colapsIcon} />
              </div>
            </div>
          </div>
          {/* taskBox */}
          <div className={style.taskBox}>
            <div className={style.taskBoxHeadingBox}>
              <h4 className={style.taskBoxTitle}>Done</h4>
              <div className={style.taskBoxUtilityBox}>
                <img src={colaps} alt="colaps" className={style.colapsIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
