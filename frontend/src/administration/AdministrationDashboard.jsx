import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { fetchUsers} from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
function AdministrationDashboard() {
    const { user } = useSelector((state) => state.auth)
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
                    <h3>
                        Courses/Subjects
                    </h3>
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
            {user ? (
                <> 
                {user.admin ? ( 
                <div className="card">
                    <div className="card-header">
                        <h2>New Tutors</h2>
                        
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table width="100%">
                                <thead>
                                    <tr>
                                        <td>Teacher NO:</td>
                                        <td>Full name</td>
                                        <td>Email</td>
                                        <td>Subject</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                {users
                                .filter((user) => user.tutor&&!user.approved) // Filter users where tutor is true
                                .map((user, index) => (
                                    <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.units.length > 0 ? user.units[0] : ''}</td>
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
                  ): (
                <></>
                )
            }
             </>
            ): (
              <></>
            )}
            </div>
        </main>

      </div>
    
  );
}

export default AdministrationDashboard;
