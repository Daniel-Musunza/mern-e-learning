import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { getsubjects} from '../features/subjects/subjectSlice';
import { getchapters } from '../features/chapters/chapterSlice';

function Header() {
  const [showTutorials, setShowTutorials] = useState(false);
  const [showExams, setShowExams] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [ showServices, setShowServices] = useState(false);
  const [ showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const { subjects, isError, message } = useSelector((state) => state.subjects);
  const { chapters } = useSelector((state) => state.chapters);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //   navigate('/login');
    // }

    dispatch(getsubjects());
    dispatch(getchapters());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };
  const toggleTutorials = () => {
    closeExercises();
    closeServices();
    setShowTutorials((prevShowTutorials) => !prevShowTutorials);
  };
  const closeTutorials = () => {
    setShowTutorials(false);
  };
 
  const toggleExercises = () => {
    closeTutorials();
    closeServices();
    setShowExercises((prevShowExercises) => !prevShowExercises);  };
  const closeExercises = () => {
    setShowExercises(false);
  };
  const toggleServices = () => {
    closeExercises();
    closeTutorials();
    setShowServices((prevShowServices) => !prevShowServices);
  };

  const closeServices = () => {
    setShowServices(false);
  };

  return (
    <>
    <div id="pagetop" className="w3-bar notranslate w3-white">
        <a href="index.html" className="w3-bar-item w3-button w3-hover-none w3-left ga-top ga-top-w3home" title="Home" style={{ width: "75px" }}>
          <img src="favicon.ico" alt="" width="50px" />
        </a>
        {user ? ( 
          <div className="w3-bar-item w3-button w3-hide-small barex w3-padding-16 ga-top ga-top-cert-and-course ws-hide-750" id="navbtn_certified" title="Your Course" style={{fontWeight: '500px', color: '#0077b6;'}}>
          <div style={{color: '#1c68c4', fontSize: '20px', fontWeight: '500px'}}>{user && user.course_name}</div> 
          </div>
          ): (
            <></>
          )
        }
       {user ? (
        <> 
        {user.approved ? ( 
          <div>
            <div className="w3-bar-item w3-button w3-hide-small barex w3-padding-16 ga-top ga-top-cert-and-course ws-hide-750" id="navbtn_certified" title="Your Course" style={{fontWeight: '500px', color: '#0077b6;'}}>
            <div style={{color: '#1c68c4', fontSize: '20px', fontWeight: '500px'}}>Tutor Dashboard</div> 
          </div>
          </div>
          ): (
            <> 
            </>
          )
          }
        </>
          ): (
            <>
              <a  onClick={toggleTutorials} className="w3-bar-item w3-button w3-hide-small barex bar-item-hover w3-padding-16 ga-top ga-top-tut-and-ref"
                id="navbtn_tutorials"
                title="Tutorials and References"
              >
              Tutorial Notes<i className='fa fa-caret-down' style={{ fontSize: '15px', display: showTutorials ? 'none' : 'inline' }}></i>
                <i className='fa fa-caret-up' style={{ display: showTutorials ? 'inline' : 'none', fontSize: '15px' }}></i>
              </a>
              <a onClick={toggleExercises} className="w3-bar-item w3-button w3-hide-small barex bar-item-hover w3-padding-16 ga-top ga-top-exc-and-quz" id="navbtn_Exercises" title="Chapterwise Questions">
              Chapterwise Questions<i className='fa fa-caret-down' style={{ fontSize: '15px', display: showExercises ? 'none' : 'inline' }}></i>
                <i className='fa fa-caret-up' style={{ display: showExercises ? 'inline' : 'none', fontSize: '15px' }}></i>
              </a>
              <a onClick={toggleServices} className="w3-bar-item w3-button w3-hide-small barex bar-item-hover w3-padding-16 ga-top ga-top-services" href="javascript:void(0)" id="navbtn_services" title="Our Services">
                Services <i className='fa fa-caret-down' style={{ fontSize: '15px', display: showServices ? 'none' : 'inline' }}></i>
                <i className='fa fa-caret-up' style={{ display: showServices ? 'inline' : 'none', fontSize: '15px' }}></i>
              </a>
              <a className="w3-bar-item w3-button w3-hide-small barex bar-item-hover w3-padding-16 ga-top ga-top-services"
                    style={{width: 'auto!important', marginRight:'40px', textAlign: 'center'}} href=""
                    title="Attend a class"><svg
                      style={{position:'relative',right:'2px', top:'2px', marginRight:'3px'}} xmlns="http://www.w3.org/2000/svg" width="16"
                      height="16" fill="#0077b6" class="bi bi-gift" viewBox="0 0 16 16">
                      <path
                        d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z" />
              </svg> Live Classes</a>
            </>
          )
        }
              {/* menu */}
        <div className='menu-bar'>
          <a onClick={toggleMenu} className="w3-bar-item w3-button bar-item-hover w3-padding-16 ga-top ga-top-menu"
            href="javascript:void(0)" title="Menu" style={{
              width: '93px',
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
            }}>
            Menu
            <i className="fa fa-caret-down" style={{
              fontSize: '15px',
              display: showMenu ? 'none' : 'inline',
            }}></i>
            <i className="fa fa-caret-up" style={{
              display: showMenu ? 'inline' : 'none',
              fontSize: '15px',
            }}></i>
          </a>
        </div>
        {user ? (
          
          
           <div onClick={onLogout} id="loginactioncontainer" class="w3-right"
              style={{paddingTop:'8px',paddingBottom:'8px',marginLeft:'1px',width: '55px'}}>
              <div id="mypagediv"></div>
              <a id="w3loginbtn" title="Log out of the system"
                class="w3-bar-item w3-btn bar-item-hover w3-right ws-light-green ga-top ga-top-login"
                href=""
                target="_self">Logout</a>
            </div>
         
        ) : (
            <div id="loginactioncontainer" class="w3-right"
              style={{paddingTop:'8px',paddingBottom:'8px',marginLeft:'1px',width: '55px', textDecoration: 'none'}}>
              <div id="mypagediv"></div>
              <a id="w3loginbtn" title="Login to your account"
                class="w3-bar-item w3-btn bar-item-hover w3-right ws-light-green ga-top ga-top-login"
                href=""
                target="_self">
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Log in
                  </Link> 
              </a>
            </div>
        )}
            <div class="w3-right w3-white" style={{paddingTop:'5px'}}>
            {user ? (  
            <div id="loginactioncontainer" class="w3-right"
              style={{paddingTop:'3px',paddingBottom:'8px', paddingLeft:'1px', marginRight:'30px',width: '25px'}}>
              
              <Link id="w3loginbtn" title="Your Username" style={{paddingLeft:'3px'}}
                class="w3-bar-item w3-btn bar-item-hover w3-right ga-top ga-top-login"
                to={`/profile-view/${user._id}`}
                target="_self">{user && user.name}</Link>
            </div>
            ) : (
              <a id="signupbtn_topnav" class="w3-bar-item w3-button w3-right ws-green ws-hover-green ga-top ga-top-signup"
              style={{width: '93px', borderRadius: '25px', marginRight: '25px', marginTop: '3px', position: 'relative', zIndex:'5', textDecoration: 'none'}}
              href="" title="Sign Up to Improve Your Learning Experience">
                <Link to='/register' style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sign Up
                </Link>
              </a>
            )}
            </div>
      </div>
      {showMenu && (
      <div  id="myAccordion" className="w3-hide-large" style={{cursor: 'default', zIndex: 99, position: 'fixed', bottom: 0, top: '56px', overflowY: 'scroll' }}>
      <div onClick={closeMenu}  className="w3-button w3-large w3-right ga-top w3-border w3-round ga-top-close-accordion" style={{ marginBottom: '13px', marginRight: '13px', marginTop: '13px', width: '100px' }}>
        Close
        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="33" fill="#111" className="bi bi-x" viewBox="0 0 16 16" style={{ position: 'absolute', top: '20px', paddingLeft: '2px' }}>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
      {user ? (
        <> 
      {user.approved ? ( 
        <div  className="w3-container" onClick={closeMenu}>
        <Link onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} to="/">
            Home<i className='fa fa-caret-down w3-right'></i>
        </Link>
        <Link onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} to="/dashboard">
        Dashboard<i className='fa fa-caret-down w3-right'></i>
        </Link>
        <Link  onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} to="/add-courses">
        Courses & Subjects<i className='fa fa-caret-down w3-right'></i>
        </Link>
        <Link  onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} to="/add-chapters">
        Subject Chapters<i className='fa fa-caret-down w3-right'></i>
        </Link>
        <Link onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} to="/add-questions">
        Chapter Questions<i className='fa fa-caret-down w3-right'></i>
        </Link>
        <Link  onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} to="/students">
        Students<i className='fa fa-caret-down w3-right'></i>
        </Link>
        <Link  onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} to="/tutors">
          Tutors<i className='fa fa-caret-down w3-right'></i>
        </Link>
        </div>
        
      ): (
        <></>
      )}
       </>
          ): (
            <div className="w3-container">
              <a onClick={toggleTutorials} className="w3-button w3-block ga-top ga-top-menu-tut-and-ref" style={{ fontSize: '22px' }} href="javascript:void(0);">
                Tutorial Notes<i className='fa fa-caret-down w3-right'></i>
              </a>
              {showTutorials && (<div id="sectionxs_tutorials" className="w3-show" style={{ backgroundColor: '#282A35', color: 'white' }} onClick={closeMenu}>
                <div className="w3-content" style={{ maxWidth: '1100px', fontSize: '18px', paddingLeft: '3%' }}>
                  <span
                      className="w3-button w3-xxxlarge w3-display-topright closeaccbtn w3-hide-small"
                      onClick={closeTutorials}
                    >
                    &times;
                  </span>
                  <br />
                  <div className="w3-row-padding w3-bar-block">
                    <div className="w3-container" style={{ paddingLeft: '13px', position: 'relative', marginBottom: '25px' }}>
                      <h2 style={{ color: '#FFF4A3' }}>
                        <b>Tutorial Notes</b>
                      </h2>
                    </div>
                  
                      {subjects.length > 0 ? (
                      <div>
                      {subjects.map((subject) => (
                          <div className="w3-col l4 m6">
                              <h3 className="w3-margin-top">{subject.subject}</h3>
                              <div className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-tut-html" >
                                <span className="learn-span">Learn</span> 
                              </div>  
                              <Link
                                className="ws-btn acclink-text ga-top-drop ga-top-drop-tut-html"
                                to={`/tutorial-notes/${subject._id}`} // Pass the subject's ID as a parameter in the link
                                title="Read Notes"
                              >Tutorial</Link>
                              
                              <br />
                              {/* More anchor tags for HTML and CSS */}
                              {/* ... */}
                            </div>    ))}
                      </div>
                    ) : (
                      <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>Register to to see your Units</div>
                    )}
                  </div>
                </div>
              </div>)}
              <a onClick={toggleExercises} className="w3-button w3-block ga-top ga-top-menu-exc-and-quz" style={{ fontSize: '22px' }} href="javascript:void(0);">
                Chapterwise Questions<i className='fa fa-caret-down w3-right'></i>
              </a>
              {showExercises && (<div id="sectionxs_Exercises" className="w3-show" style={{ backgroundColor: '#282A35', color: 'white' }} onClick={closeMenu}>
                <div className="w3-content" style={{ maxWidth: 1100, fontSize: 18, paddingLeft: '3%' }}>
                    <span
                      className="w3-button w3-xxxlarge w3-display-topright closeaccbtn w3-hide-small"
                      onClick={closeExercises}
                    >
                    &times;
                  </span>
                  <br />
                  <div className="w3-row-padding w3-bar-block">
                    <div className="w3-container" style={{ paddingLeft: 13, position: 'relative', marginBottom: 25 }}>
                      <h2 style={{ color: '#FFF4A3' }}>
                        <b>Chapterwise Questions</b>
                      </h2>
                    </div>
                  {subjects.length > 0 ? (
                      <div>
                      {subjects.map((subject) => (
                        <div className="w3-col l4 m6" key={subject._id}>
                          <h3 className="w3-margin-top">{subject.subject}</h3>
                          <h4 className="w3-margin-top">Topics</h4>
                          <ol>
                            {chapters
                              .filter((chapter) => chapter.subject_id === subject._id)
                              .map((chapter) => (
                                <li key={chapter._id}>
                                  <a className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html">
                                    {chapter.chapter}
                                  </a>
                                  <Link className="ws-btn acclink-text ga-top-drop ga-top-drop-ex-html" to={`/questions/${chapter._id}`}>
                                    Questions
                                  </Link>
                                  <br />
                                </li>
                              ))}
                          </ol>
                        </div>
                      ))}

                      </div>
                    ) : (
                      <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>Register to to see your Units</div>
                    )}

                  </div>
                  <br />
                </div>
              </div>)}
              <a onClick={toggleServices} className="w3-button w3-block ga-top ga-top-menu-services" style={{ fontSize: '22px' }} href="javascript:void(0);">
                Services <i className='fa fa-caret-down w3-right'></i>
              </a>
              {showServices && ( <div id="sectionxs_services" className="w3-show" style={{ backgroundColor: '#282A35', color: 'white' }} onClick={closeMenu}>
                <div className="w3-content" style={{ maxWidth: 1100, fontSize: 18, paddingLeft: '3%' }}>
                  <span
                      className="w3-button w3-xxxlarge w3-display-topright closeaccbtn w3-hide-small"
                      onClick={closeServices}
                    >
                    &times;
                  </span>
                  <br />
                  <div className="w3-row-padding serviceboxes">
                    <div
                      className="w3-container"
                      style={{ paddingLeft: 13, position: 'relative', marginBottom: 25 }}
                    >
                      <h2 style={{ color: '#FFF4A3' }}>
                        <b>All Our Services</b>
                      </h2>
                      <p style={{ fontSize: 17 }}>
                      we offer a wide range of services and products for beginners and professionals,
                        <br className="w3-hide-medium w3-hide-small" /> helping millions of people everyday to
                        learn and master new skills.
                      </p>
                    </div>

                    <div className="w3-col m4 s12">
                      <a
                        href="tutorials/index.html"
                        className="serviceslink ga-top-drop ga-top-drop-services-tut"
                        title="Tutorials"
                      >
                        <div className="w3-padding services w3-round">
                          <h4>Free Tutorials</h4>
                          <p>Enjoy our free tutorials like millions of other internet users</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="w3-row-padding serviceboxes" style={{ marginTop: 30 }}>
                  
                    <div className="w3-col m4 s12">
                      <a
                        href="CATtest/default.html"
                        className="serviceslink ga-top-drop ga-top-drop-services-qz"
                        title="Test yourself with CATS"
                      >
                        <div className="w3-padding services w3-round">
                          <h4>Chapterwise Questions</h4>
                          <p>Test yourself with multiple choice Chapterwise Questions</p>
                        </div>
                      </a>
                    </div>

                    <div className="w3-col m4 s12">
                      <a
                        href="https://campus.w3schools.com/collections/certifications"
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
                  <br />
                </div>
              </div>)}
              <br />
              <a onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-spaces" style={{ fontSize: '22px' }} href="" title="Get Your Own Website With W3schools Spaces">
                Live classes
              </a>
              <br />
              <a  onClick={closeMenu} className="w3-button w3-block ga-top ga-top-menu-videos" style={{ fontSize: '22px' }} href="videos/index.html" title="Video Tutorials">
                Videos
                <svg style={{ position: 'absolute', right: '35px' }} width="12" height="32" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.65723 6.24707C6.76704 5.91764 7.233 5.91765 7.34281 6.24707L7.98828 8.1835C8.276 9.04666 8.95332 9.72399 9.81648 10.0117L11.7529 10.6572C12.0824 10.767 12.0824 11.233 11.7529 11.3428L9.81649 11.9883C8.95332 12.276 8.27599 12.9533 7.98828 13.8165L7.34281 15.7529C7.233 16.0823 6.76704 16.0823 6.65723 15.7529L6.01173 13.8165C5.72401 12.9533 5.04669 12.276 4.18353 11.9883L2.24707 11.3428C1.91764 11.233 1.91764 10.767 2.24707 10.6572L4.18353 10.0117C5.04669 9.72399 5.72401 9.04667 6.01173 8.18352L6.65723 6.24707Z" fill="#9763f6"></path>
                  <path d="M2.79434 1.14824C2.86023 0.950586 3.1398 0.950587 3.20569 1.14824L3.59297 2.3101C3.7656 2.828 4.172 3.2344 4.6899 3.40703L5.85177 3.79432C6.04942 3.86021 6.04942 4.13978 5.85177 4.20567L4.6899 4.59296C4.172 4.76559 3.7656 5.17199 3.59297 5.68989L3.20569 6.85176C3.13981 7.04941 2.86023 7.04942 2.79434 6.85176L2.40704 5.68988C2.23441 5.17198 1.82801 4.76559 1.31012 4.59296L0.148241 4.20567C-0.0494137 4.13978 -0.0494138 3.86021 0.148241 3.79432L1.31012 3.40703C1.82802 3.2344 2.23441 2.82801 2.40704 2.31011L2.79434 1.14824Z" fill="#9763f6"></path>
                  <path d="M9.8629 0.0988265C9.90682 -0.032943 10.0932 -0.0329419 10.1371 0.098828L10.3953 0.873401C10.5104 1.21867 10.7813 1.4896 11.1266 1.60469L11.9012 1.86288C12.0329 1.9068 12.0329 2.09319 11.9012 2.13711L11.1266 2.39531C10.7813 2.51039 10.5104 2.78133 10.3953 3.12659L10.1371 3.90117C10.0932 4.03294 9.90682 4.03294 9.8629 3.90117L9.6047 3.12659C9.48961 2.78132 9.21868 2.5104 8.87342 2.39531L8.09883 2.13711C7.96706 2.09319 7.96706 1.9068 8.09883 1.86288L8.87342 1.60469C9.21868 1.4896 9.48961 1.21867 9.6047 0.873408L9.8629 0.0988265Z" fill="#9763f6"></path>
                </svg>
              </a>
            </div>
          )
        }
      <div className="w3-container" style={{ marginTop: '36px' }}>
        <a className="w3-bar-item w3-button ga-fp w3-hover-white w3-round w3-large" target="_blank" href="" title="W3Schools on Facebook">
          <i className="fa fa-facebook-square"></i>
        </a>
        <a className="w3-bar-item w3-button ga-fp w3-hover-white w3-round w3-large" target="_blank" href="" title="W3Schools on Instagram">
          <i className="fa fa-instagram"></i>
        </a>
        <a className="w3-bar-item w3-button ga-fp w3-hover-white w3-round w3-large" target="_blank" href="" title="W3Schools on LinkedIn">
          <i className="fa fa-linkedin-square"></i>
        </a>
        <a className="w3-bar-item w3-button ga-fp w3-hover-white w3-round w3-large" target="_blank" href="" title="Join the W3schools commy on Discord">
          <i className="fa fa-discord"></i>
        </a>
      </div>
      </div>
      )}
      {showTutorials && (
        <nav
          id="nav_tutorials"
          className="w3-hide-small navex"
          style={{
            position: 'fixed',
            bottom: 0,
            top: '56px',
            overflowY: 'scroll',
            backgroundColor: '#282A35',
            color: 'white',
            paddingBottom: '60px',
          }}
          onClick={closeTutorials}
        >
        <div className="w3-content" style={{ maxWidth: '1100px', fontSize: '18px', paddingLeft: '3%' }}>
          <span
              className="w3-button w3-xxxlarge w3-display-topright closeaccbtn w3-hide-small"
             
            >
            &times;
          </span>
          <br />
          <div className="w3-row-padding w3-bar-block">
            <div className="w3-container" style={{ paddingLeft: '13px', position: 'relative', marginBottom: '25px' }}>
              <h2 style={{ color: '#FFF4A3' }}>
                <b>Tutorial Notes</b>
              </h2>
            </div>
             {subjects.length > 0 ? (
                <div>
                  {subjects.map((subject) => (
                    <div className="w3-col l4 m6">
                        <h3 className="w3-margin-top">{subject.subject}</h3>
                        <div className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-tut-html" >
                          <span className="learn-span">Learn</span> 
                        </div>  
                        <Link
                          className="ws-btn acclink-text ga-top-drop ga-top-drop-tut-html"
                          to={`/tutorial-notes/${subject._id}`} // Pass the subject's ID as a parameter in the link
                          title="Read Notes"
                        >Tutorial</Link>
                        
                        <br />
                        {/* More anchor tags for HTML and CSS */}
                        {/* ... */}
                      </div>    ))}
                </div>
              ) : (
                <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>Register to to see your Units</div>
              )}
          </div>
        </div>
        <br />
        </nav>
      )}

      {showExercises&& (
      <nav
        id="nav_Exercises"
        className="w3-hide-small navex"
        style={{
          position: 'fixed',
          bottom: 0,
          top: 56,
          overflowY: 'scroll',
          backgroundColor: '#282A35',
          color: 'white',
          paddingBottom: 60,
        }}
        onClick={closeExercises}
      >
        <div className="w3-content" style={{ maxWidth: 1100, fontSize: 18, paddingLeft: '3%' }}>
            <span
              className="w3-button w3-xxxlarge w3-display-topright closeaccbtn w3-hide-small"
              
            >
            &times;
          </span>
          <br />
          <div className="w3-row-padding w3-bar-block">
            <div className="w3-container" style={{ paddingLeft: 13, position: 'relative', marginBottom: 25 }}>
              <h2 style={{ color: '#FFF4A3' }}>
                <b>Chapterwise Questions</b>
              </h2>
            </div>
            {subjects.length > 0 ? (
                <div>
                  
                  {subjects.map((subject) => (
                  <div className="w3-col l4 m6" key={subject._id}>
                    <h3 className="w3-margin-top">{subject.subject}</h3>
                    <h4 className="w3-margin-top">Topics</h4>
                    <ol>
                      {chapters
                        .filter((chapter) => chapter.subject_id === subject._id)
                        .map((chapter) => (
                          <li key={chapter._id}>
                            <a className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html">
                              {chapter.chapter}
                            </a>
                            <Link className="ws-btn acclink-text ga-top-drop ga-top-drop-ex-html" to={`/questions/${chapter._id}`}>
                              Questions
                            </Link>
                            <br />
                          </li>
                        ))}
                    </ol>
                  </div>
                ))}

                </div>
              ) : (
                <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>Register to to see your Units</div>
              )}
             
          </div>
          <br />
        </div>
      </nav>
       )}

      {showServices && (
      <nav
        id="nav_services"
        className="w3-hide-small navex"
        style={{
          position: 'fixed',
          bottom: 0,
          top: 56,
          overflowY: 'scroll',
          backgroundColor: '#282A35',
          color: 'white',
          paddingBottom: 60,
        }}
        onClick={closeServices}
      >
        <div className="w3-content" style={{ maxWidth: 1100, fontSize: 18, paddingLeft: '3%' }}>
           <span
              className="w3-button w3-xxxlarge w3-display-topright closeaccbtn w3-hide-small"
             
            >
            &times;
          </span>
          <br />
          <div>
            <div className="w3-row-padding serviceboxes">
              <div
                className="w3-container"
                style={{ paddingLeft: 13, position: 'relative', marginBottom: 25 }}
              >
                <h2 style={{ color: '#FFF4A3' }}>
                  <b>All Our Services</b>
                </h2>
                <p style={{ fontSize: 17 }}>
                  We offer a wide range of services and products for beginners and professionals,
                  <br className="w3-hide-medium w3-hide-small" /> helping millions of people everyday to
                  learn and master new skills.
                </p>
              </div>
            </div>
            <div className='servics'>
              <div className="w3-col m4 servic s12">
                <a
                  href="tutorials/index.html"
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
          </div>
          </div>
          <br />
       
      </nav>
      )}
      
    </>
  )
}

export default Header
