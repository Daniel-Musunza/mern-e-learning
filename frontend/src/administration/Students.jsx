import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom'
function Students() {

  return (
    <div>
      <SideBar />
      
       
         <main>
          
            <div className="recent-grid">
                <div className="card">
                    <div className="card-header">
                        <h2>All Students</h2>
                        
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

export default Students;
