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
                    <Link className="w3-bar-item w3-button ga-nav" to={`/tutorial-notes/${subject.id}`}  title="Tutorial" key={subject.id}>{subject.subject}</Link>
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
        <h2> Our Chapter-Based Questions Area </h2>
        <img src="questions_screenshort.png" alt="Questions Image" />
      </section>
      <section className='section3'>
              <div className="section3-title">
                <h2>
                  <b>All Our Services</b>
                </h2>
                <p>
                  We offer a wide range of services and products for beginners and professionals,
                  <br className="w3-hide-medium w3-hide-small" /> helping millions of people everyday to
                  learn and master new skills.
                </p>
              </div>
            <div className='section3-services'>
              <div className="w3-col m4 servic s12">
                <a
                  href="/"
                  className="serviceslink ga-top-drop ga-top-drop-services-tut"
                  title="Tutorials"
                >
                  <div className="w3-padding services w3-round">
                    <h4>Free Tutorials</h4>
                    <p>Enjoy our free tutorials like millions of other internet users</p>
                  </div>
                </a>
              </div>
            <div className="w3-col m4 servic s12">
                <a
                  href=""
                  className="serviceslink ga-top-drop ga-top-drop-services-qz"
                  title="Test yourself with Chapterwise Questions"
                >
                  <div className="w3-padding services w3-round">
                    <h4>Chapterwise Questions</h4>
                    <p>Test yourself with multiple choice Chapterwise Questions</p>
                  </div>
                </a>
              </div>
              <div className="w3-col m4 servic s12">
                <a
                  href=""
                  className="serviceslink ga-top-drop ga-top-drop-services-cert"
                  target="_blank"
                  title="Main Exam"
                >
                  <div className="w3-padding services w3-round" style={{ position: 'relative' }}>
                    <h4>Live Classes</h4>
                    <p>Enjoy live classes from Our Qualified Tutors</p>
                    <svg
                      style={{ position: 'absolute', top: 15, right: 25 }}
                      width="15"
                      height="36"
                      viewBox="0 0 12 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.65723 6.24707C6.76704 5.91764 7.233 5.91765 7.34281 6.24707L7.98828 8.1835C8.276 9.04666 8.95332 9.72399 9.81648 10.0117L11.7529 10.6572C12.0824 10.767 12.0824 11.233 11.7529 11.3428L9.81649 11.9883C8.95332 12.276 8.27599 12.9533 7.98828 13.8165L7.34281 15.7529C7.233 16.0823 6.76704 16.0823 6.65723 15.7529L6.01173 13.8165C5.72401 12.9533 5.04669 12.276 4.18353 11.9883L2.24707 11.3428C1.91764 11.233 1.91764 10.767 2.24707 10.6572L4.18353 10.0117C5.04669 9.72399 5.72401 9.04667 6.01173 8.18352L6.65723 6.24707Z"
                        fill="#9763f6"
                      ></path>
                      <path
                        d="M2.79434 1.14824C2.86023 0.950586 3.1398 0.950587 3.20569 1.14824L3.59297 2.3101C3.7656 2.828 4.172 3.2344 4.6899 3.40703L5.85177 3.79432C6.04942 3.86021 6.04942 4.13978 5.85177 4.20567L4.6899 4.59296C4.172 4.76559 3.7656 5.17199 3.59297 5.68989L3.20569 6.85176C3.13981 7.04941 2.86023 7.04942 2.79434 6.85176L2.40704 5.68988C2.23441 5.17198 1.82801 4.76559 1.31012 4.59296L0.148241 4.20567C-0.0494137 4.13978 -0.0494138 3.86021 0.148241 3.79432L1.31012 3.40703C1.82802 3.2344 2.23441 2.82801 2.40704 2.31011L2.79434 1.14824Z"
                        fill="#9763f6"
                      ></path>
                      <path
                        d="M9.8629 0.0988265C9.90682 -0.032943 10.0932 -0.0329419 10.1371 0.098828L10.3953 0.873401C10.5104 1.21867 10.7813 1.4896 11.1266 1.60469L11.9012 1.86288C12.0329 1.9068 12.0329 2.09319 11.9012 2.13711L11.1266 2.39531C10.7813 2.51039 10.5104 2.78133 10.3953 3.12659L10.1371 3.90117C10.0932 4.03294 9.90682 4.03294 9.8629 3.90117L9.6047 3.12659C9.48961 2.78132 9.21868 2.5104 8.87342 2.39531L8.09883 2.13711C7.96706 2.09319 7.96706 1.9068 8.09883 1.86288L8.87342 1.60469C9.21868 1.4896 9.48961 1.21867 9.6047 0.873408L9.8629 0.0988265Z"
                        fill="#9763f6"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          
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
                <li>   <Link to={`/tutorial-notes/${subject.id}`}  title="Tutorial" key={subject.id}>{subject.subject}</Link> Tutorial</li>
                    )).slice(0,9)}
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
