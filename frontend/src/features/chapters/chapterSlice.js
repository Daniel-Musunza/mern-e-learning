import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chapterService from './chapterService'

const initialState = {
  chapters: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user Courses
export const getchapters = createAsyncThunk(
  'chapters/getAll',
  async (_, thunkAPI) => {
    try {
      return await chapterService.getchapters();
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

export const addchapter = createAsyncThunk(
  'chapters/create',
  async (chapterData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chapterService.addchapter(chapterData,token);
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
export const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getchapters.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getchapters.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chapters= action.payload
      })
      .addCase(getchapters.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addchapter.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addchapter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chapters.push(action.payload)
      })
      .addCase(addchapter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = chapterSlice.actions
export default chapterSlice.reducer
