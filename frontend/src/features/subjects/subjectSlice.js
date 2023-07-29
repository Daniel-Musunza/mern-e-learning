import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import subjectService from './subjectService'

const initialState = {
  subjects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new subject
export const createsubject = createAsyncThunk(
  'subjects/create',
  async (subjectData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await subjectService.createsubject(subjectData, token)
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
// Update user subject
export const updatesubject = createAsyncThunk(
  'subjects/update',
  async (subjectData, thunkAPI) => {
    try {
      const { id } = subjectData; // Extract the id from subjectData
      const token = thunkAPI.getState().auth.user.token;
      return await subjectService.updatesubject(subjectData, id, token);
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

// Delete user subject
export const deletesubject = createAsyncThunk(
  'subjects/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await subjectService.deletesubject(id, token)
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
//Toggle Complete User subject
export const toggleCompletesubject = createAsyncThunk(
  'subjects/toggleComplete',
  async (subjectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await subjectService.toggleCompletesubject(subjectId, token);
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
//toggle Edit User subject
export const toggleEditsubject = createAsyncThunk(
  'subjects/toggleEdit',
  async (subjectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await subjectService.toggleEditsubject(subjectId, token);
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
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createsubject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createsubject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subjects.push(action.payload)
      })
      .addCase(createsubject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
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
      .addCase(updatesubject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatesubject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subjects = state.subjects.filter(
          (subject) => subject._id !== action.payload.id
        )
      })
      .addCase(updatesubject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletesubject.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletesubject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.subjects = state.subjects.filter(
          (subject) => subject._id !== action.payload.id
        )
      })
      .addCase(deletesubject.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(toggleCompletesubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleCompletesubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedsubjects = state.subjects.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        );
        state.subjects = updatedsubjects;
      })
      .addCase(toggleCompletesubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(toggleEditsubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleEditsubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedsubjects = state.subjects.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        );
        state.subjects = updatedsubjects;
      })
      .addCase(toggleEditsubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
})

export const { reset } = subjectSlice.actions
export default subjectSlice.reducer
