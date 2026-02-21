import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../../api/client';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await apiClient.getGoals(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createGoal = createAsyncThunk('goals/createGoal', async (text, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await apiClient.createGoal(token, text);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    await apiClient.deleteGoal(token, id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const goalSlice = createSlice({
  name: 'goals',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.items = state.items.filter((goal) => goal.id !== action.payload);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default goalSlice.reducer;
