import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import answerService from './answerService'

const initialState = {
  answers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user Courses
export const getanswers = createAsyncThunk(
  'answers/getAll',
  async (_, thunkAPI) => {
    try {
      return await answerService.getanswers();
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
export const addanswer = createAsyncThunk(
  'answers/create',
  async (answerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await answerService.addanswer(answerData,token);
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

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getanswers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getanswers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.answers= action.payload
      })
      .addCase(getanswers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addanswer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addanswer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.answers= action.payload
      })
      .addCase(addanswer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = answerSlice.actions
export default answerSlice.reducer
