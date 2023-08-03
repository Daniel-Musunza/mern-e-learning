import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import subjectReducer from '../features/subjects/subjectSlice'
import allsubjectReducer from '../features/subjects/allSubjectSlice'
import courseReducer from '../features/courses/courseSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectReducer,
    allsubjects: allsubjectReducer,
    courses: courseReducer,
  },
})
