import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import SideBar from './SideBar';
import { useSelector, useDispatch } from 'react-redux';
import { addSubject } from '../features/subjects/subjectSlice';
import { getallsubjects} from '../features/subjects/allSubjectSlice';
import { fetchCourses, createCourse } from '../features/courses/courseSlice';

function AddCoursesAndSubjects() {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const { courses } = useSelector((state) => state.courses);
  const { allsubjects } = useSelector((state) => state.allsubjects);
  const [course_name, setCourseName] = useState('');

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [subjectName, setSubjectName] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(fetchCourses());
    dispatch(getallsubjects());
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

  const handleSelectCourse = (e) => {
    const courseId = e.target.value;
    const selectedCourse = courses.find((course) => course._id === courseId);
    if (selectedCourse) {
      setSelectedCourseId(courseId);
      setSelectedCourseName(selectedCourse.course_name);
    }
    console.log(selectedCourse);
  };

  const handleAddSubject = (e) => {
    e.preventDefault();

    if (selectedCourseId.trim() === '' || subjectName.trim() === '') {
      return;
    }

    dispatch(
      addSubject({
        course_id: selectedCourseId,
        course_name: selectedCourseName,
        subject: subjectName,
      })
    );
    setSelectedCourseId('');
    setSelectedCourseName('');
    setSubjectName('');
    alert('Subject Added Successfully !!');
  };

  return (
    <div>

      <div className="main-content">
        <SideBar />
        <main className="content-area">
        <div className="contain">
          
            <h3 style={{color: 'GrayText'}}>All Courses</h3>
            <div className='courses-list'>
            {courses.map((course) => (
                  <h4 key={course._id}>
                    {course.course_name}
                  </h4>
                ))}
            </div>
          </div>
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
            <hr />
            <h3>Add Subject</h3>
            <form onSubmit={handleAddSubject}>
              <label htmlFor="school-level">Select Course:</label>
              <select
                id="school-level"
                value={selectedCourseId}
                onChange={handleSelectCourse}
              >
                <option value="">Select a course</option>

                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />
              <button id="submit" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="contain">
          <h3 style={{color: 'GrayText'}}>All Subjects</h3>
          <label htmlFor="school-level">Select Course:</label>
          <select
                id="school-level"
                value={selectedCourseId}
                onChange={handleSelectCourse}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_name}
                  </option>
                ))}
              </select>

              {selectedCourseId && (
                <div className='subject-list'>

                    {allsubjects
                      .filter((subject) => subject.course_id === selectedCourseId)
                      .map((subject) => (
                        <>
                        <h4 value={subject._id}>
                          {subject.subject}
                        </h4>
                         <Link
                         className="ws-btn acclink-text ga-top-drop ga-top-drop-tut-html"
                         to={`/tutorial-notes/${subject._id}`} // Pass the subject's ID as a parameter in the link
                         title="Add Notes"
                       >Add Notes</Link>
                       </>
                      ))}
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddCoursesAndSubjects;
