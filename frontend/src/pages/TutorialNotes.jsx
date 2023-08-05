import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { addNotes, getsubjects } from '../features/subjects/subjectSlice';

function TutorialNotes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [notes, setNotes] = useState('');

  // Fetch subject data when the component mounts
  useEffect(() => {
    dispatch(getsubjects());
  }, [dispatch]);

  // Get the subject data from Redux state
  const subjects = useSelector((state) => state.subjects.subjects);

  // Find the subject with the specified id
  const subject = subjects.find((subject) => subject._id === id);

  useEffect(() => {
    // Set the notes from the subject in the state when the subject is found
    if (subject) {
      setNotes(subject.notes);
    }
  }, [subject]);

  const handleChange = (value) => {
    setNotes(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Send the updated notes to the server
    dispatch(addNotes({ id, notes }));
    setNotes('');
  };
  // Function to render the formatted HTML safely
  const renderFormattedHTML = (htmlString) => {
    return { __html: htmlString };
  };

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
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <ReactQuill value={notes} onChange={handleChange} />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div> */}
      <div className='notes'>
      {subject && (
        <div
          dangerouslySetInnerHTML={renderFormattedHTML(subject.notes)}
        ></div>
      )}
      </div>
    </div>
  );
}

export default TutorialNotes;
