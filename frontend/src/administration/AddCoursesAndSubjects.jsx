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
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const [showModal, setShowModal] = useState(false);
  const toggleModal = (e) => {
    e.preventDefault();
    setShowModal((prevShowModal) => !prevShowModal);
  };
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
    alert("Course Added Successfully !!");
  };

  const handleSelectCourse = (e) => {
    const courseId = e.target.value;
    const selectedCourse = courses.find((course) => course._id === courseId);
    if (selectedCourse) {
      setSelectedCourseId(courseId);
      setSelectedCourseName(selectedCourse.course_name);
    }
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
    toggleModal();
  };
  
  return (
    <div>

      <div className="main-content">
        <SideBar />
        {showModal && (
        <div className="modalContainer">
        <div className='notificationsContainer'>
        <div className='dadJoke'>
          <div className='flex'>
            <div className='flexShrink0'>
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className='dadJokeSvg'>
                <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fill-rule="evenodd"></path>
              </svg>
            </div>
            <div className='dadJokePromptWrap'>
              <p className='dadJokePromptHeading'>For Confirmation</p>
              <div className='dadJokePrompt'>
                <p>
                 would you like to continue?
                </p>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div className='dadJokeButtonContainer'>
                <button className='dadJokeButtonMain' type="button" onClick={handleAddSubject}>
                  Confirm
                </button>
              </div>
              <div className='dadJokeButtonContainer'>
                <button className='dadJokeButtonMain' type="button" onClick={toggleModal}>
                  Cancel
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        )}
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
          
            {user ? (
              <>
                {user.admin ? (
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
                    <form onSubmit={toggleModal}>
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
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
         

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
