import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
function AdministrationDashboard() {

  return (
    <div>
      <SideBar />
      <div class="main-content">
       
         <main>
    <div className="cards">
        <a href="/resume/all-templates" className="card-single">
            <div>
                <h3>200</h3>
                <span>Students</span>
            </div>
            <div>
                <span><i className="fa fa-book"></i></span>
            </div>
        </a>
        <a href="/client/all-orders" className="card-single">
            <div>
                <h1>2</h1>
                <span>Orders</span>
            </div>
            <div>
                <span><i className="fa fa-shopping-bag" aria-hidden="true"></i></span>
            </div>
        </a>
        <a href="/client/incomplete" className="card-single">
            <div>
                <h1>3</h1>
                <span>Incomplete Orders</span>
            </div>
            <div>
                <span><i className="fa-solid fa-sort"></i></span>
            </div>
        </a>
        <a href="/client/revision" className="card-single">
            <div>
                <h1>1</h1>
                <span>On Revision</span>
            </div>
            <div>
                <span><i className="fa-solid fa-rotate"></i></span>
            </div>
        </a>
    </div>
    <div className="recent-grid">
        <div className="card">
            <div className="card-header">
                <h2>Unauthorised Teachers</h2>
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
    </div>
  );
}

export default AdministrationDashboard;
