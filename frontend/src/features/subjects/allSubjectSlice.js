import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import subjectService from './subjectService'

const initialState = {
  allsubjects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user subjects
export const getallsubjects = createAsyncThunk(
  'allsubjects/getAll',
  async (_, thunkAPI) => {
    try {
      return await subjectService.getallsubjects()
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


export const allsubjectSlice = createSlice({
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
      .addCase(getallsubjects.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getallsubjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.allsubjects = action.payload
      })
      .addCase(getallsubjects.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = allsubjectSlice.actions
export default allsubjectSlice.reducer
