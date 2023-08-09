import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getquestions } from '../features/questions/questionSlice';
import { getanswers } from '../features/answers/answerSlice';
import { getchapters } from '../features/chapters/chapterSlice';

function Questions() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getquestions());
    dispatch(getanswers());
    dispatch(getchapters());
  }, [dispatch]);

  const questions = useSelector((state) => state.questions.questions);
  const { answers } = useSelector((state) => state.answers);
  const { chapters } = useSelector((state) => state.chapters);

  // Filter questions based on the matching chapter_id
  const filteredQuestions = questions.filter((question) => question.chapter_id === id);
  const filteredChapter = chapters.find((chapter) => chapter._id === id);
  return (
    <div
      className="container"
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '100%',
        top: 56,
        overflowY: 'scroll',
        overflowX: 'none',
        backgroundColor: '#282A35',
        color: 'white',
        paddingBottom: 60,
        marginLeft: 0,
      }}
    >
      <div className='questions'>
      <h3 style={{textAlign: 'center'}}>
        <span style={{color: '#40c9ff'}}>{filteredChapter.chapter} </span>
        Questions</h3>
      <ol className='ol' style={{ listStyle: 'decimal' }}>
     {filteredQuestions
       .map((question) => (
         <li key={question._id} style={{ listStyle: 'decimal' }}>
         <h4 className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html" style={{color: '#40c9ff'}}>
            {question.question}
         </h4>
        <ul className='ul'>
        {answers
          .filter((answer) => answer.question_id === question._id)
          .map((answer) => (
           <li key={answer._id}>
             <a className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html">
              {answer.answer}
             </a>
           <br />
            </li>
            ))}
        </ul>
         <br />
         </li>
          ))}
      </ol>
      </div>
    </div>
  );
}

export default Questions;
