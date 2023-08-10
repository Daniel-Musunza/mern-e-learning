import { useParams } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
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

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  
  // Initialize answer styles state
  const initialAnswerStyles = {};
  questions.forEach((question) => {
    answers.forEach((answer) => {
      initialAnswerStyles[question._id] = {
        ...initialAnswerStyles[question._id],
        [answer._id]: {
          color: 'black',
          backgroundColor: '#ccc',
        },
      };
    });
  });
  const [answerStyles, setAnswerStyles] = useState(initialAnswerStyles);

  const handleAnswerClick = (questionId, answerId, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: { answerId, answer },
    }));
  
    // Update answer styles when an answer is selected
    setAnswerStyles((prevAnswerStyles) => ({
      ...prevAnswerStyles,
      [questionId]: {
        ...prevAnswerStyles[questionId], // Preserve existing styles for other answers
        [answerId]: {
          color: 'black',
          backgroundColor: '#ccc',
        },
      },
    }));
  };
  

  const handleMyScores = async (e) => {
    e.preventDefault();
  
    // Calculate the score and attempted questions
    let userScore = 0;
    let userAttempted = 0;
  
    // Update answer styles based on correctness
    const updatedAnswerStyles = { ...answerStyles };
    questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question._id];
      const correctAnswer = question.correctanswer;
      if (selectedAnswer) {
        const answerId = selectedAnswer.answerId;
        updatedAnswerStyles[question._id] = {
          ...updatedAnswerStyles[question._id], // Preserve existing styles for other answers
          [answerId]: {
            backgroundColor: selectedAnswer.answer === correctAnswer ? 'rgb(17, 249, 17)' : 'red',
          },
        };
        userAttempted++;
        if (selectedAnswer.answer === correctAnswer) {
          userScore++;
        }
      }
    });
    setAnswerStyles(updatedAnswerStyles);
  
    // Update the state with calculated values
    setScore(userScore);
    setAttempted(userAttempted);
  };
  

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
      <div className='myscores'>
        <span>{score}</span>/
        <span>{attempted}</span>
      </div>
      <div className='submitanswers'>
        <button 
        style={{ 
          textAlign: 'center', 
          padding: '10px', 
          fontSize: 'medium',
          backgroundColor: 'black', 
          border: 'none', 
          color: '#fff', 
          cursor: 'pointer' 
          }}
          onClick={handleMyScores}
        >
            My Scores
        </button>
      </div>
      <div className='questions'>
        <h3 style={{ textAlign: 'center' }}>
          <span style={{ color: '#40c9ff' }}>{filteredChapter.chapter} </span>
          Questions
        </h3>
        <ol className='ol' style={{ listStyle: 'decimal' }}>
          {filteredQuestions.map((question) => (
            <li key={question._id} style={{ listStyle: 'decimal' }}>
              <h4 className="w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html" style={{ color: '#40c9ff' }}>
                {question.question}
              </h4>
              <br />
              {/* <span style={{ color: 'rgb(17, 249, 17)' }}>{question.correctanswer}</span> */}
              <ul className='ul'>
              {answers
                .filter((answer) => answer.question_id === question._id)
                .map((answer) => (
                  <li key={answer._id}>
                    <div
                      className='w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html'
                      onClick={() => handleAnswerClick(question._id, answer._id, answer.answer)}
                      // style={{
                      //   color: answerStyles[question._id]?.color,
                      //   backgroundColor: answerStyles[question._id]?.backgroundColor,
                      // }}
                      style={{
                        color: answerStyles[question._id]?.[answer._id]?.color,
                        backgroundColor: answerStyles[question._id]?.[answer._id]?.backgroundColor,
                      }}
                    >
                      {answer.answer}
                    </div>
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
