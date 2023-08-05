import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import subjectReducer from '../features/subjects/subjectSlice'
import allsubjectReducer from '../features/subjects/allSubjectSlice'
import courseReducer from '../features/courses/courseSlice'
import chapterReducer from '../features/chapters/chapterSlice'
import questionReducer from '../features/questions/questionSlice'
import answerReducer from '../features/answers/answerSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectReducer,
    allsubjects: allsubjectReducer,
    courses: courseReducer,
    chapters: chapterReducer,
    questions: questionReducer,
    answers: answerReducer,
  },
})
