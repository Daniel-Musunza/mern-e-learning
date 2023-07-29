import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import subjectReducer from '../features/subjects/subjectSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectReducer,
  },
})
