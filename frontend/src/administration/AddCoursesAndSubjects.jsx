import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
function AddCoursesAndSubjects() {

  return (
    <div>
      <SideBar />
      <div className="main-content">
         <main className='content-area'>
            <div className="contain">
            <h3>Add Course</h3>
                <form className="add-subject">
                   
                    <input type="text" placeholder='Course Name'/>
                    <button id="submit" type='submit'>Submit</button>
                </form>
                <h3>Add Subject</h3>
                <form>
                <label htmlFor="school-level">Select School Level:</label>
                        <select id="school-level">
                            <option value="elementary">Elementary Level</option>
                            <option value="middle">Middle Level</option>
                            <option value="high-school">High School Level</option>
                        </select>

                        
                    <input type="text" placeholder='Subject Name'/>
                    <button id="submit" type='submit'>Submit</button>
                </form>
            </div>
        </main>
    </div>
    </div>
  );
}

export default  AddCoursesAndSubjects;
