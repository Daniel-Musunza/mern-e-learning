import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { getallsubjects} from '../features/subjects/allSubjectSlice';
import { getchapters } from '../features/chapters/chapterSlice';
import { fetchCourses} from '../features/courses/courseSlice';
import {addquestion } from '../features/questions/questionSlice';

function AddQuestions() {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const { courses } = useSelector((state) => state.courses);
  const { allsubjects } = useSelector((state) => state.allsubjects);
  const { chapters } = useSelector((state) => state.chapters);

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');



  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(fetchCourses());
    dispatch(getallsubjects());
    dispatch(getchapters());
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
  const handleChapterChange = (e) => {
    const chapterId = e.target.value;
    setSelectedChapterId(chapterId);
  };
  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    if (!selectedChapterId || questionName.trim() === '') {
      return;
    }

    dispatch(addquestion({ 
      chapter_id: selectedChapterId,
      question: questionName,
      correctAnswer: correctAnswer, 
      answerA: answerA,
      answerB: answerB,
      answerC: answerC,
      answerD: answerD
     }));
    setQuestionName('');
    alert("Question Added Successfully ...")
  };

  return (
    <div>
      <div className="main-content">
        <main className="content-area">
          <div className="contain">
            <h3>Add Chapter</h3>
            <form onSubmit={handleQuestionSubmit}>
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
              {selectedSubjectId && (
                <>
                  <label htmlFor="school-level">Select Chapter:</label>
                  <select
                    id="school-level"
                    onChange={handleChapterChange}
                    value={selectedChapterId}
                  >
                    <option value="">Select a chapter</option>
                    {chapters
                      .filter((chapter) => chapter.subject_id === selectedSubjectId)
                      .map((chapter) => (
                        <option key={chapter._id} value={chapter._id}>
                          {chapter.chapter}
                        </option>
                      ))}
                  </select>
                </>
              )}
              <input
                type="text"
                placeholder="Question"
                value={questionName}
                onChange={(e) => setQuestionName(e.target.value)}
              />
               <input
                type="text"
                placeholder="The Correct Answer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />
               <input
                type="text"
                placeholder="Choice A"
                value={answerA}
                onChange={(e) => setAnswerA(e.target.value)}
              />
               <input
                type="text"
                placeholder="Choice B"
                value={answerB}
                onChange={(e) => setAnswerB(e.target.value)}
              />
               <input
                type="text"
                placeholder="Choice C"
                value={answerC}
                onChange={(e) => setAnswerC(e.target.value)}
              />
               <input
                type="text"
                placeholder="Choice D"
                value={answerD}
                onChange={(e) => setAnswerD(e.target.value)}
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

export default AddQuestions;