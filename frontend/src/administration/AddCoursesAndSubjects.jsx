import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import SideBar from './SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { addSubject } from '../features/subjects/subjectSlice';
import { fetchCourses, createCourse } from '../features/courses/courseSlice';

function AddCoursesAndSubjects() {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { courses } = useSelector((state) => state.courses);

  const [course_name, setCourseName] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(fetchCourses());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  const handleAddCourse = (e) => {
    e.preventDefault();

    if (course_name.trim() === '') {
      return;
    }

    dispatch(createCourse({ course_name }), fetchCourses());
    setCourseName('');
    alert("Course Added Successfully !!")
  };

  return (
    <div>
      <SideBar />
      <div className="main-content">
        <main className="content-area">
          <div className="contain">
            <h3>Add Course</h3>
            <form className="add-subject" onSubmit={handleAddCourse}>
              <input
                type="text"
                placeholder="Course Name"
                value={course_name}
                onChange={(e) => setCourseName(e.target.value)}
              />
              <button id="submit" type="submit">
                Submit
              </button>
            </form>
            <h3>Add Subject</h3>
            <form>
              <label htmlFor="school-level">Select Course:</label>
              <select id="school-level">
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
              <input type="text" placeholder="Subject Name" />
              <button id="submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddCoursesAndSubjects;
