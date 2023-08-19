import { useParams } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getquestions } from '../features/questions/questionSlice';
import { getchapters } from '../features/chapters/chapterSlice';

function Questions() {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answerStyles, setAnswerStyles] = useState({});

  useEffect(() => {
    dispatch(getquestions());
    dispatch(getchapters());

    }, [dispatch]);

  const questions = useSelector((state) => state.questions.questions);

  const { chapters } = useSelector((state) => state.chapters);

  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);


 
  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
  
    setAnswerStyles((prevAnswerStyles) => ({
      ...prevAnswerStyles,
      [questionId]: {
        ...prevAnswerStyles[questionId],
        [answer]: {
          color: 'black',
          backgroundColor: '#ccc',
        },
      },
    }));
  };
  

  const handleMyScores = (e) => {
    e.preventDefault();

    let userScore = 0;
    let userAttempted = 0;

    const updatedAnswerStyles = { ...answerStyles };

    filteredQuestions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question._id];
      const correctAnswer = question.correctanswer;

      if (selectedAnswer) {
        updatedAnswerStyles[question._id] = {
          ...updatedAnswerStyles[question._id], // Preserve existing styles for other answers
          [selectedAnswer]: {
            backgroundColor: selectedAnswer === correctAnswer ? 'rgb(17, 249, 17)' : 'red',
          },
        };
        if (selectedAnswer === correctAnswer) {
          userScore++;
        } 
        userAttempted++;
      }
    });

    setAnswerStyles(updatedAnswerStyles);
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
              <h4 className="acctop-link ga-top-drop ga-top-drop-ex-html" style={{ color: '#40c9ff' }}>
                {question.question}
              </h4>
              <br />
              <span style={{ color: 'rgb(17, 249, 17)' }}>{question.correctanswer}</span>
              <ul className='ul'>
                <li>
                  <div
                    className='acctop-link ga-top-drop ga-top-drop-ex-html answer '
                    onClick={() => handleAnswerClick(question._id, question.answerA)}  
                    style={{
                        color: answerStyles[question._id]?.[question.answerA]?.color,
                        backgroundColor: answerStyles[question._id]?.[question.answerA]?.backgroundColor,
                      }}
                  >
                    <span style={{ paddingRight: '10px', color: '#40c9ff' }}> A. </span>
                    <span>{question.answerA}</span>
                  </div>
                </li>
                <br />
                <li>
                  <div
                    className='acctop-link ga-top-drop ga-top-drop-ex-html answer '
                    onClick={() => handleAnswerClick(question._id, question.answerB)}  
                    style={{
                        color: answerStyles[question._id]?.[question.answerB]?.color,
                        backgroundColor: answerStyles[question._id]?.[question.answerB]?.backgroundColor,
                      }}
                  >
                    <span style={{ paddingRight: '10px', color: '#40c9ff' }}> B. </span>
                    <span>{question.answerB}</span>
                  </div>
                </li>
                <br />
                <li>
                  <div
                    className='acctop-link ga-top-drop ga-top-drop-ex-html answer '
                    onClick={() => handleAnswerClick(question._id, question.answerC)}  
                    style={{
                        color: answerStyles[question._id]?.[question.answerC]?.color,
                        backgroundColor: answerStyles[question._id]?.[question.answerC]?.backgroundColor,
                      }}
                  >
                    <span style={{ paddingRight: '10px', color: '#40c9ff' }}> C. </span>
                    <span>{question.answerC}</span>
                  </div>
                </li>
                <br />
                <li>
                  <div
                    className='acctop-link ga-top-drop ga-top-drop-ex-html answer '
                    onClick={() => handleAnswerClick(question._id, question.answerD)}  style={{
                        color: answerStyles[question._id]?.[question.answerD]?.color,
                        backgroundColor: answerStyles[question._id]?.[question.answerD]?.backgroundColor,
                      }}
                  >
                    <span style={{ paddingRight: '10px', color: '#40c9ff' }}> D. </span>
                    <span>{question.answerD}</span>
                  </div>
                  <br />
                </li>
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
