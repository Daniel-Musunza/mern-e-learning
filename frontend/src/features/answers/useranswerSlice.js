import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import useranswerService from './useranswerService'

const initialState = {
  useranswers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user Courses
export const getuseranswers = createAsyncThunk(
  'useranswers/getAll',
  async (_, thunkAPI) => {
    try {
      return await useranswerService.getuseranswers();
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
export const submitAnswers = createAsyncThunk(
  'useranswers/update',
  async (answerData, thunkAPI) => {
    try {
      const { id } = answerData; // Extract the id from subjectData
      const token = thunkAPI.getState().auth.user.token;
      return await useranswerService.submitAnswers(answerData, id, token);
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

export const useranswerSlice = createSlice({
  name: 'useranswer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getuseranswers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getuseranswers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.useranswers= action.payload
      })
      .addCase(getuseranswers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(submitAnswers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(submitAnswers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.useranswers= action.payload
      })
      .addCase(submitAnswers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = useranswerSlice.actions
export default useranswerSlice.reducer
