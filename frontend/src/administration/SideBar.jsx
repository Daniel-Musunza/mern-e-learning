
import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { useSelector, useDispatch } from 'react-redux';
function SideBar() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        {/* <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '48px', color: 'red' }} /> */}
      </div>
      <div className="sidebar-menu" style={{ height: '500px' }}>
        <ul id="navbar" style={{ marginLeft: '5px' }}>
          <li>
            <Link to="/">
              {/* <FontAwesomeIcon icon={faHouse} /> */}
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              {/* <FontAwesomeIcon icon={faHouse} /> */}
              Dashboard
            </Link>
          </li>
          {user ? (
              <>
                {user.admin ? (
                  <>
                    <li>
                      <Link to="/add-courses">
                        {/* <FontAwesomeIcon icon={faSquareArrowUpRight} /> */}
                        Courses & Subjects
                      </Link>
                    </li>
                    <li>
                      <Link to="/students">
                        {/* <FontAwesomeIcon icon={faUserGraduate} /> */}
                        Students
                      </Link>
                    </li>
                    <li>
                      <Link to="/tutors">
                        {/* <FontAwesomeIcon icon={faChalkboardTeacher} /> */}
                        Tutors
                      </Link>
                    </li>
                  </>
                  ) : user.approved ?(
                  <>
                   <li>
                      <Link to="/add-chapters">
                        {/* <FontAwesomeIcon icon={faBookReader} /> */}
                        Subject Chapters
                      </Link>
                    </li>
                    <li>
                      <Link to="/add-questions">
                        {/* <FontAwesomeIcon icon={faBookOpen} /> */}
                        Chapter Questions
                      </Link>
                    </li>
                  </>
                ): (
                  <></>
                )
                }
              </>
            ) : (
              <></>
            )}
          
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
