import Header from '../components/Header'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import { getsubjects} from '../features/subjects/subjectSlice';

const Dashboard = () => {
  
// Move the declaration of 'navigate' here before using it in the useEffect
const navigate = useNavigate();
const dispatch = useDispatch();
const { user } = useSelector((state) => state.auth);
const { subjects, isError, message } = useSelector((state) => state.subjects);

useEffect(() => {
  if (isError) {
    console.log(message);
  }

  dispatch(getsubjects());
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
            <a
              href="javascript:void(0);"
              className="topnav-icons fa w3-right w3-bar-item w3-button ga-nav"
              style={{ lineHeight: '1.1', paddingTop: '7px!important', paddingBottom: '7px!important' }}
               // You should implement gSearch() function
              title="Search W3Schools"
            >
              &#xe802;
            </a>
            <a
              href="javascript:void(0);"
              className="topnav-icons fa w3-right w3-bar-item w3-button ga-nav"
              style={{ lineHeight: '1.1', paddingTop: '7px!important', paddingBottom: '7px!important' }}
            // You should implement gTra() function
              title="Translate W3Schools"
            >
              &#xe801;
            </a>
            <a
              href="javascript:void(0);"
              className="topnav-icons fa w3-right w3-bar-item w3-button ga-nav"
              style={{ lineHeight: '1.1', paddingTop: '7px!important', paddingBottom: '7px!important' }}
             
            >
              &#xe80b;
            </a>
          </div>

          <div
            style={{
              display: 'none',
              position: 'absolute',
              zIndex: 4,
              right: 52,
              height: 30,
              top: -4,
              backgroundColor: '#282A35',
              letterSpacing: 'normal',
            }}
            id="googleSearch"
          >
            <div className="gcse-search"></div>
          </div>
          <div
            style={{
              display: 'none',
              position: 'absolute',
              zIndex: 3,
              right: 111,
              paddingTop: 3,
              height: 32,
              top: -3,
              backgroundColor: '#282A35',
              textAlign: 'right',
            }}
            id="google_translate_element"
          ></div>
{/* 
          <div id="darkmodemenu" className="ws-black">
            <input
              id="radio_darkpage"
              type="checkbox"
              name="radio_theme_mode"
             // You should implement click_darkpage() function
            />
            <label htmlFor="radio_darkpage"> Dark mode</label>
            <br />
            <input
              id="radio_darkcode"
              type="checkbox"
              name="radio_theme_mode"
             // You should implement click_darkcode() function
            />
            <label htmlFor="radio_darkcode"> Dark code</label>
          </div> */}
        </div>
      </div>
      <section className='section1'>

      </section>
      <section className='section2'>
        
        </section>
        <section className='section3'>
        
        </section>
        <section className='section4'>
        
        </section>
      <div id="footer" className="footer w3-container w3-white">

      </div>
    </div>
  );
};

export default Dashboard;
