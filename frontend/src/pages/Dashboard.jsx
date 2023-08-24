import Header from '../components/Header'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { getsubjects} from '../features/subjects/subjectSlice';
import { getallsubjects} from '../features/subjects/allSubjectSlice';
import { fetchCourses} from '../features/courses/courseSlice';
const Dashboard = () => {
  
// Move the declaration of 'navigate' here before using it in the useEffect
const navigate = useNavigate();
const dispatch = useDispatch();
const { user } = useSelector((state) => state.auth);
const { subjects, isError, message } = useSelector((state) => state.subjects);
const { allsubjects } = useSelector((state) => state.allsubjects);
const { courses } = useSelector((state) => state.courses);
useEffect(() => {
  if (isError) {
    console.log(message);
  }

  dispatch(getsubjects());
  dispatch(getallsubjects());
  dispatch(fetchCourses());
  return () => {
    dispatch(reset());
  };
}, [user, navigate, isError, message, dispatch]);


  return (
    <div>
    <Header />
    <div className="topnav notranslate" id="topnav" style={{ position: 'fixed', top: 56 }}>
        <div style={{ overflow: 'auto' }}>
          <div className="w3-bar w3-left topnavbar" style={{ width: '100%', overflow: 'hidden', height: 32 }}>
            <a
              href="javascript:void(0);"
              className="topnav-icons fa fa-menu w3-hide-large w3-hide-medium w3-hide-small w3-left w3-bar-item w3-button ga-nav"
              style={{ lineHeight: 1.1, paddingTop: '8px!important', paddingBottom: '7px!important' }}
             // You should implement open_menu() function
              title="Menu"
            ></a>
            <div className="s">
            {subjects.length > 0 ? (
                <div>
                  {subjects.map((subject) => (
                    <Link className="w3-bar-item w3-button ga-nav" to={`/tutorial-notes/${subject._id}`}  title="Tutorial" key={subject._id}>{subject.subject}</Link>
                  ))}
                </div>
              ) : (
                <Link className="w3-bar-item w3-button ga-nav" to={'/login'} title="LogIn" style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>Register to to see your Units</Link>
              )}
            </div>
          
          </div>

      
        </div>
      </div>
      <section className='section1'>
        <div className='section1-left'>
           <h1> Learn Online </h1>
            <h3 style={{textAlign: 'center'}}> With the world's largest E-Learning platform.</h3>

        </div>
        <div className='section1-right'>
          <img src="https://www.brookings.edu/wp-content/uploads/2017/02/computers_class001.jpg" alt="Students Learning Online" />
        </div>


      </section>
      <section className='section2'>
        <h1> Our Chapter-Based Questions Area </h1>
        <img src="" alt="Questions Image" />
      </section>
      <section className='section3'>
        
      </section>
      <section className='section4'>
      <div className="w3-container w3-center" style={{padding:'0, 20px 5px 20px'}}>
        <h5>Follow us:</h5>
        <a className="w3-bar-item w3-button w3-hover-black w3-xlarge w3-round"  href="" title=" on Facebook"><i class="fa-brands fa-facebook"></i></a>
        <a className="w3-bar-item w3-button w3-hover-black w3-xlarge w3-round" href="" title=" on Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a className="w3-bar-item w3-button w3-hover-black w3-xlarge w3-round" href="" title=" on LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        <a className="w3-bar-item w3-button w3-hover-black w3-xlarge w3-round"  href="" title="Join thecommunity on Discord"><i class="fa-brands fa-discord"></i></a>
      </div>
      </section>
      <div id="footer" className="footer w3-container w3-white">
        <div className="part1">
          <div className='part-of-part1'>
            <h4>Popular Courses</h4>
            <ul>
            {courses.map((course) => (
                    <li>{course.course_name}</li>
            )).slice(0,9)}
            </ul>
          </div>
          <div className='part-of-part1'>
            <h4>Popular Tutorials</h4>
            <ul>
            {allsubjects.map((subject) => (
                <li>   <Link to={`/tutorial-notes/${subject._id}`}  title="Tutorial" key={subject._id}>{subject.subject}</Link> Tutorial</li>
                    )).slice(0,9)}
            </ul>
          </div>
          <div className='part-of-part1'>
            <h4>Popular Teachers</h4>
            <ul>
              <li>one</li>
              <li>one</li>
              <li>one</li>
              <li>one</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="part2">
         
         <p>This Elearning platform is optimized for effective learning and training. Content examples are simplified to aid comprehension. Tutorials, references, and chapter-based questions are regularly reviewed for accuracy, although complete correctness cannot be guaranteed. Your use of this platform implies your acceptance of our terms of use, cookie policy, and privacy policy.</p>
          <span>Copyright 2023 . All Rights Reserved.</span>
          <img src="favicon.ico" alt="logo" width='60px' />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
