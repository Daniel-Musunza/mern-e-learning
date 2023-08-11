import React, { useState, useEffect } from 'react';
// import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom'
function AdministrationDashboard() {

  return (
    <div>
      {/* <SideBar /> */}
      
       
         <main>
            <div className="cards">
                <Link to='/students' className="card-single">
                    <div>
                        <h3>200</h3>
                        <span>Students</span>
                    </div>
                    <div>
                        <span><i className="fa fa-book"></i></span>
                    </div>
                </Link>
                <Link to='/add-courses' className="card-single">
                    <div>
                    <h3>Courses/Subjects</h3>
                        <span></span>
                    </div>
                    <div>
                        <span><i className="fa fa-shopping-bag" aria-hidden="true"></i></span>
                    </div>
                </Link>
                <Link to='/add-chapters' className="card-single">
                    <div>
                        <h3>Chapters</h3>
                        <span></span>
                    </div>
                    <div>
                        <span><i className="fa-solid fa-sort"></i></span>
                    </div>
                </Link>
                <Link to='/add-questions' className="card-single">
                    <div>
                        <h3>Questions & Answers</h3>
                        <span></span>
                    </div>
                    <div>
                        <span><i className="fa-solid fa-rotate"></i></span>
                    </div>
                </Link>
            
            </div>
            <div className="recent-grid">
                <div className="card">
                    <div className="card-header">
                        <h2>New Tutors</h2>
                        <a href="teachers.html">
                            <button>See all <span><i className="fa-solid fa-arrow-right"></i></span></button>
                        </a>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <td>Teacher NO:</td>
                                        <td>Full name</td>
                                        <td>Subject</td>
                                        <td>Resume</td>
                                        <td>Email</td>
                                        <td>Approve</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>John Doe</td>
                                        <td>Maths</td>
                                        <td>file</td>
                                        <td>JohnDoe@gmail.com</td>
                                        <td>
                                            <a href="">View Details</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>James Doe</td>
                                        <td>Biology</td>
                                        <td>file</td>
                                        <td>Jamesdoe@gmail.com</td>
                                        <td>
                                            <a href="">View Details</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>

      </div>
    
  );
}

export default AdministrationDashboard;
