import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUsers, updateUser } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { FaSignInAlt } from 'react-icons/fa';

function ProfileView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const user = users.find((user) => user._id === id);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(fetchUsers());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  const makeAdmin = (e) => {
    e.preventDefault();
    // Dispatch an action to update user's admin status
    // You'll need to implement this action in your Redux store
    const data = { 
      id, 
      admin: true
    }
    // console.log(data);
    dispatch(updateUser(data));
    alert("admin added successfully");
  };
  const approveTutor = (e) => {
    e.preventDefault();
    // Dispatch an action to update user's admin status
    // You'll need to implement this action in your Redux store
    const data = { 
      id, 
      approved: true
    }
    // console.log(data);
    dispatch(updateUser(data));
    alert("tutor Approved successfully");
  };
  const renderTutorDetails = () => {
    return (
      < >
        <div className='form-group' >
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>
        </div>
        <div className='form-group'>
          <h4>Subjects:</h4>
          <ul>
            {user.units.map((unit, index) => (
              <li key={index}>{unit}</li>
            ))}
          </ul>
        </div>
        <div className='form-group'>
          <h4>Resume:</h4>
          {user.resume && (
            <a
              href={`data:application/pdf;base64,${user.resume.data}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              View Resume (PDF)
            </a>
          )}
        </div>
        <div className='form-group'>
        {user ? (
          <>
            {!user.admin ? (
              <button onClick={makeAdmin}>Make an Admin</button>
            ) : !user.approved ? (
              <button onClick={approveTutor}>Approve</button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

         
        </div>
      </>
    );
  };

  const renderStudentDetails = () => {
    return (
      <div className='form-group'>
        <h3>Name: {user.name}</h3>
        <p>Email: {user.email}</p>

        <h4>Course: {user.course_name}</h4>
        {user ? (
          <>
            {!user.admin ? (
              <button onClick={makeAdmin}>Make an Admin</button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <div className='container'>
      <section className='heading' style={{ color: '#ffff' }}>
        <h1>
          <FaSignInAlt /> ProfileView
        </h1>
      </section>

      <section className='heading'>
        <h1>Profile View</h1>
      </section>
      
      <section className='form' style={{ backgroundColor: '#282A35',color: '#ffff', padding: '20px', borderRadius: '10px'}}>
        <form>
        {user ? (
          <> 
          {user.tutor ? renderTutorDetails() : renderStudentDetails()}
          </>
          ): (
            <></>
          )
        }
        </form>
      </section>
    </div>
  );
}

export default ProfileView;