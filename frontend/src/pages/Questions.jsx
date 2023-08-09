import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getquestions } from '../features/questions/questionSlice';
import { getanswers } from '../features/answers/answerSlice';
import { submitAnswers, getuseranswers } from '../features/answers/useranswerSlice';
import { getcorrectanswers } from '../features/answers/correctanswerSlice';
import { getchapters } from '../features/chapters/chapterSlice';

function Questions() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getquestions());
    dispatch(getanswers());
    dispatch(getuseranswers());
    dispatch(getcorrectanswers());
    dispatch(getchapters());
  }, [dispatch]);

  const questions = useSelector((state) => state.questions.questions);
  const { answers } = useSelector((state) => state.answers);
  const { correctanswers } = useSelector((state) => state.correctanswers);
  const { useranswers } = useSelector((state) => state.useranswers);
  const { chapters } = useSelector((state) => state.chapters);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);

  const user = useSelector((state) => state.auth.user);

  const handleAnswerClick = (questionId, answerId) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answerId,
    }));
  };

  const handleMyScores = async (e) => {
    e.preventDefault();
  
    // Calculate the score and attempted questions
    let userScore = 0;
    let userAttempted = 0;
  
  
    // Prepare data to send to the API
    const answerData = filteredQuestions.map((question) => ({
      user_id: user._id, // Assuming you have the user ID available
      question_id: question._id,
      answer_id: selectedAnswers[question._id],
    }));
  
    try {
      // Call the submitAnswers function
      await dispatch(submitAnswers(answerData));
  
      
      filteredQuestions.forEach((question) => {
        if (selectedAnswers[question.question_id]) {
          userAttempted++;
          const selectedAnswerId = selectedAnswers[question._id];
          const correctAnswer = correctanswers.find(
            (answer) => answer.question_id === question.question_id
          );
          if (correctAnswer && correctAnswer.answer_id === selectedAnswerId) {
            userScore++;
          }
        }
      });
    
      // Update the state with calculated values
      setScore(userScore);
      setAttempted(userAttempted);
      // Handle success if needed
    } catch (error) {
      // Handle error if needed
    }
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
              <ul className='ul'>
                {answers
                  .filter((answer) => answer.question_id === question._id)
                  .map((answer) => (
                    <li key={answer._id}>
                      <div
                        className={`w3-bar-item w3-button acctop-link ga-top-drop ga-top-drop-ex-html ${
                          selectedAnswers[question._id] === answer._id ? 'selected-answer' : ''
                        }`}
                        onClick={() => handleAnswerClick(question._id, answer._id)}
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
