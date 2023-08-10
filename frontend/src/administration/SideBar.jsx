import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
function SideBar() {

  return (
    <div>
        <div className="sidebar">
    <div className="sidebar-brand">
        {/* <img id="logo-img" className="img-center" src="/logo.png" alt="Logo" /> */}
        <i className="fas fa-graduation-cap" style={{ fontSize: '48px', color: 'red' }}></i>
    </div>
    <div className="sidebar-menu" style={{ height: '500px' }}>
        <ul id="navbar" style={{ marginLeft: '5px' }}>
            <li>
            
                <a href="index.html">
                    <i className="fa-solid fa-house"></i>
                    Home
                </a>
            </li>
            <li>
                <a href="notes.html">
                    <i className="fa-solid fa-square-arrow-up-right"></i>
                    notes
                </a>
            </li>
            <li>
                <a href="quizes.html">
                    <i className="fa fa-book-reader" aria-hidden="true"></i>
                    Quizes
                </a>
            </li>
            <li>
                <a href="answers.html">
                    <i className="fa fa-book-open" aria-hidden="true"></i>
                    Answers
                </a>
            </li>
            <li>
                <Link to='/add-courses'>
                <i className="fa fa-book" aria-hidden="true"></i>
                    Add Subjects
                </Link>
            </li>
            <li>
                <a href="students.html">
                    <i className="fa fa-user-graduate"></i>
                    Students
                </a>
            </li>
            <li>
                <a href="teachers.html">
                    <i className="fa fa-chalkboard-teacher"></i>
                    Teachers
                </a>
            </li>
            <li>
                <a href="admin.html">
                    <i className="fa-solid fa-square-pen"></i>
                    Admin
                </a>
            </li>
            <li>
                <a href="/chat">
                    <i className="fa-sharp fa-solid fa-comments"></i>
                    General Chat
                </a>
            </li>
            <li>
                <a href="/faq">
                    <i className="fa-sharp fa-solid fa-question"></i>
                    FAQ
                </a>
            </li>
        </ul>
    </div>
</div>

    </div>
  );
}

export default SideBar;
