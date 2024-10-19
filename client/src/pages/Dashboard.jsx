import { useState } from "react";
import style from "../css/dashboard.module.css";
import Sidebar from "../components/Sidebar.jsx";

//image
import people from "../assets/people.png";
import dropdown from "../assets/dropdownIcon.png";

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
      </div>
    </div>
  );
}

export default Dashboard;
