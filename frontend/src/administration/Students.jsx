import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { fetchUsers} from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
function Students() {
    const dispatch = useDispatch();
    const { isLoading, isError, message } = useSelector(
        (state) => state.auth
      );
    
    const { users } = useSelector((state) => state.users);

    useEffect(() => {
        if (isError) {
          toast.error(message);
        }
        dispatch(fetchUsers());
      }, [isError, message, dispatch]);
    
      if (isLoading) {
        return <Spinner />;
      }
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
                                        <td>NO:</td>
                                        <td>Full name</td>
                                        <td>Email</td>
                                        <td>Course</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                {users
                                .filter((user) => !user.tutor) // Filter users where tutor is true
                                .map((user, index) => (
                                    <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.course_name}</td>
                                    <td>
                                        <Link  to={`/profile-view/${user._id}`}>View Details</Link>
                                    </td>
                                    </tr>
                                ))}



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
