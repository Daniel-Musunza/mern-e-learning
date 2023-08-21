import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import TutorialNotes from './pages/TutorialNotes'
import Questions from './pages/Questions'
import AdministartionDashboard from './administration/AdministrationDashboard'
import AddCoursesAndSubjects from './administration/AddCoursesAndSubjects'
import AddChapters from './administration/AddChapters'
import AddQuestions from './administration/AddQuestions'
import Students from './administration/Students'
import Tutors from './administration/Tutors'
function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<AdministartionDashboard />} />
            <Route path='/add-courses' element={<AddCoursesAndSubjects />} />
            <Route path='/add-chapters' element={<AddChapters />} />
            <Route path='/add-questions' element={<AddQuestions />} />
            <Route path='/students' element={<Students />} />
            <Route path='/tutors' element={<Tutors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tutorial-notes/:id' element={<TutorialNotes />} />
            <Route path='/questions/:id' element={<Questions />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
