import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css';
import { addNotes } from '../features/subjects/subjectSlice';
import { getallsubjects } from '../features/subjects/allSubjectSlice';

function TutorialNotes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [notes, setNotes] = useState('');

  // Fetch subject data when the component mounts
  useEffect(() => {
    dispatch(getallsubjects());
  }, [dispatch]);

  // Get the subject data from Redux state
  const allsubjects = useSelector((state) => state.allsubjects.allsubjects);

  // Find the subject with the specified id
  const subject = allsubjects.find((subject) => subject._id === id);

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
       <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='editor-section'>
          <ReactQuill value={notes} onChange={handleChange} className='notes-editor'></ReactQuill>
          <button onClick={onSubmit} style={{marginTop: '30px', width: '100px'}}>Submit</button>
        </div>
      </div> 
      <div >
      {subject && (
        <div className='notes' 
          dangerouslySetInnerHTML={renderFormattedHTML(subject.notes)}
        ></div>
      )}
      </div>
    </div>
  );
}

export default TutorialNotes;
