import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseService from './courseService'

const initialState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user Courses
export const fetchCourses = createAsyncThunk(
  'courses/getAll',
  async (_, thunkAPI) => {
    try {
      return await courseService.getCourses();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.courses = action.payload
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = courseSlice.actions
export default courseSlice.reducer
