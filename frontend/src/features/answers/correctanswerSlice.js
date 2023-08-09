import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import correctanswerService from './correctanswerService'

const initialState = {
  correctanswers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user Courses
export const getcorrectanswers = createAsyncThunk(
  'correctanswers/getAll',
  async (_, thunkAPI) => {
    try {
      return await correctanswerService.getcorrectanswers();
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


export const correctanswerSlice = createSlice({
  name: 'correctanswer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getcorrectanswers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getcorrectanswers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.correctanswers= action.payload
      })
      .addCase(getcorrectanswers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = correctanswerSlice.actions
export default correctanswerSlice.reducer
