import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import SideBar from './SideBar';
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

  const [showModal, setShowModal] = useState(false);
  const toggleModal = (e) => {
    e.preventDefault();
    setShowModal((prevShowModal) => !prevShowModal);
  };

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
      correctanswer: correctAnswer, 
      answerA: answerA,
      answerB: answerB,
      answerC: answerC,
      answerD: answerD
     }));

    setQuestionName('');
    alert("Question Added Successfully ...")
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
                <button className='dadJokeButtonMain' type="button" onClick={handleQuestionSubmit}>
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
            <h3>Add Chapter</h3>
            <form onSubmit={toggleModal}>
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