import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getquestions } from '../features/questions/questionSlice';
import { getanswers } from '../features/answers/answerSlice';

function Questions() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getquestions());
    dispatch(getanswers());
  }, [dispatch]);

  const questions = useSelector((state) => state.questions.questions);
  const { answers } = useSelector((state) => state.answers);

  // Filter questions based on the matching chapter_id
  const filteredQuestions = questions.filter((question) => question.chapter_id === id);

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
      <h3 style={{textAlign: 'center'}}>Chapter Questions</h3>
      <ol>
     {filteredQuestions
       .map((question) => (
         <li key={question._id}>
         <h4 className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html">
            {question.question}
         </h4>
        <ul>
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
  );
}

export default Questions;
