import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import subjectService from './subjectService'

const initialState = {
  subjects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user subjects
export const getsubjects = createAsyncThunk(
  'subjects/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await subjectService.getsubjects(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addNotes = createAsyncThunk(
  'subjects/update',
  async (subjectData, thunkAPI) => {
    try {
      const { id } = subjectData; // Extract the id from subjectData
      const token = thunkAPI.getState().auth.user.token;
      return await subjectService.addNotes(subjectData, id, token);
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
export const addSubject = createAsyncThunk(
  'subjects/create',
  async (subjectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await subjectService.addSubject(subjectData,token);
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
export const subjectSlice = createSlice({
  name: 'subject',
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
      .addCase(getsubjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getsubjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subjects = action.payload
      })
      .addCase(getsubjects.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addSubject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subjects.push(action.payload)
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subjects = action.payload
      })
      .addCase(addNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = subjectSlice.actions
export default subjectSlice.reducer
