import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { getallsubjects} from '../features/subjects/allSubjectSlice'
import { fetchCourses } from '../features/courses/courseSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    resume: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name,   resume, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  const { allsubjects} = useSelector((state) => state.allsubjects);
  const { courses } = useSelector((state) => state.courses);

  const [userType, setUserType] = useState('student');
  const [courseName, setCourseName] = useState({ id: '', name: '' });
  const [selectedUnits, setSelectedUnits] = useState([]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(getallsubjects());
    dispatch(fetchCourses()); // Dispatch fetchCourses instead of getCourses
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'userType') {
      setUserType(value);
    } else if (name === 'courseName') {
      const selectedCourse = courses.find(course => course._id === value);
      if (selectedCourse) {
        setCourseName({ id: value, name: selectedCourse.course_name });
      } else {
        setCourseName({ id: '', name: '' });
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  
  

const handleUnitChange = (e, unit) => {
  if (e.target.checked) {
    setSelectedUnits((prevUnits) => [...prevUnits, unit]);
  } else {
    setSelectedUnits((prevUnits) => prevUnits.filter((u) => u !== unit));
  }
};

const onSubmit = (e) => {
  e.preventDefault();

  if (password !== password2) {
    toast.error('Passwords do not match');
  } else {
    if (userType === 'tutor') {
      const userData = {
        name,
        email,
        password,
        resume, // Add resume to the userData
        units: userType === 'tutor' ? selectedUnits : [], // Add selectedUnits if userType is tutor, otherwise an empty array
      };

      if (userData.resume === '') {
        toast.error('Please upload your Resume');
      }

      if (userData.units.length === 0) {
        toast.error('Please select units');
      }

      // If there are errors, don't proceed with the registration
      if (userData.resume === '' || userData.units.length === 0) {
        return;
      }

      dispatch(register(userData));
    } else if (userType === 'student') {
      const userData = {
        name,
        email,
        password,
        course_id: courseName.id,
        course_name: courseName.name
         // Add courseName to the userData
      };

      if (userData.course === '') {
        toast.error('Please select a course');
      }

      // If there are errors, don't proceed with the registration
      if (userData.course === '') {
        return;
      }

      // console.log(userData)
      dispatch(register(userData));
    }
  }
};



  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading' style={{color: '#ffff'}}>
        <h1>
          <FaUser /> Register
        </h1>
      </section>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
      </section>
    <section className='form'>
      <form onSubmit={onSubmit}>
        {/* ... */}
        <div className='form-group'>
          <select
            className='form-control'
            id='userType'
            name='userType'
            value={userType}
            onChange={onChange}
          >
            <option value='student'>Student</option>
            <option value='tutor'>Tutor</option>
          </select>
        </div>
        {userType === 'student' && (
          <div className='form-group'>
         <select
            className='form-control'
            id='courseName'
            name='courseName'
            value={courseName.id}  // Use courseName.id as the selected value
            onChange={onChange}  // Use the onChange function here
          >
            {/* Add options for different course names */}
            <option value=''>Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.course_name}
              </option>
            ))}
          </select>


          </div>
        )}
        {userType === 'tutor' && (
          <div className='form-group'>
            {/* Add checkboxes for selecting units */}
            <h3 htmlFor="resume" style={{color: '#0077b6'}}>Select Your Subjects</h3>
            <hr />
            {allsubjects.map((subject) => (
              <>
              <div class="checkbox">
                <input id={subject.subject} class="checkbox__input" type="checkbox"
                  name={subject.subject}
                  checked={selectedUnits.includes(subject.subject)}
                  onChange={(e) => handleUnitChange(e, subject.subject)}
                />
                <label for={subject.subject} class="checkbox__label">
                  <span class="checkbox__custom"></span>
                 {subject.subject}
                </label>
              </div>
              <hr/>
              
              </>
            ))}
            <h3 htmlFor="resume" style={{color: '#0077b6'}}>Upload Resume</h3>
            <div className='form-group'>
                <input
                  type='file'
                  className='form-control'
                  id='resume'
                  name='resume'
                  value={resume}
                  title='Upload Resume'
                  onChange={onChange}
                />
              </div>
            {/* Add more checkboxes for different units */}
          </div>
        )}
         <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Register
