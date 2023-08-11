import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getallsubjects} from '../features/subjects/allSubjectSlice';
import { addchapter } from '../features/chapters/chapterSlice';
import { fetchCourses} from '../features/courses/courseSlice';

function AddChapters() {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const { courses } = useSelector((state) => state.courses);
  const { allsubjects } = useSelector((state) => state.allsubjects);

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [chapterName, setChapterName] = useState('');

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

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    setSelectedSubjectId('');
  };

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubjectId(subjectId);
  };

  const handleChapterSubmit = (e) => {
    e.preventDefault();

    if (!selectedSubjectId || chapterName.trim() === '') {
      return;
    }

    dispatch(addchapter({ subject_id: selectedSubjectId, chapter: chapterName }));
    setChapterName('');
    alert("Chapter Added Successfully ...")
  };

  return (
    <div>
      <div className="main-content">
        <main className="content-area">
          <div className="contain">
            <h3>Add Chapter</h3>
            <form onSubmit={handleChapterSubmit}>
              <label htmlFor="school-level">Select Course:</label>
              <select
                id="school-level"
                onChange={handleCourseChange}
                value={selectedCourseId}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_name}
                  </option>
                ))}
              </select>

              {selectedCourseId && (
                <>
                  <label htmlFor="school-level">Select Subject:</label>
                  <select
                    id="school-level"
                    onChange={handleSubjectChange}
                    value={selectedSubjectId}
                  >
                    <option value="">Select a subject</option>
                    {allsubjects
                      .filter((subject) => subject.course_id === selectedCourseId)
                      .map((subject) => (
                        <option key={subject._id} value={subject._id}>
                          {subject.subject}
                        </option>
                      ))}
                  </select>
                </>
              )}

              <input
                type="text"
                placeholder="Chapter Name"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
              />
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

export default AddChapters;