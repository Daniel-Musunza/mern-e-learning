import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import questionService from './questionService'


const initialState = {
  questions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user Courses
export const getquestions = createAsyncThunk(
  'questions/getAll',
  async (_, thunkAPI) => {
    try {
      return await questionService.getquestions();
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
export const addquestion = createAsyncThunk(
  'questions/create',
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.addquestion(questionData,token);
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

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getquestions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getquestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions= action.payload
      })
      .addCase(getquestions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addquestion.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addquestion.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.questions.push(action.payload)
      })
      .addCase(addquestion.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = questionSlice.actions
export default questionSlice.reducer
