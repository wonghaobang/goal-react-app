import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import goalService from "./goalService"

// Get user goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.getGoals(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Create new goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      /* Another option is to take it from local storage */
      const token = thunkAPI.getState().auth.user.token
      return await goalService.createGoal(goalData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Update user goal
export const updateGoal = createAsyncThunk(
  "goals/update",
  async ({ goalId, editGoal }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.updateGoal(goalId, editGoal, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await goalService.deleteGoal(goalId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const goalSlice = createSlice({
  name: "goal",
  initialState: {
    goals: [],
    isError: false,
    isLoading: null,
    message: "",
  },
  reducers: {
    resetGoalState: (state) => {
      state.goals = []
      state.isError = false
      state.isLoading = null
      state.message = ""
    },
  },
  extraReducers: {
    [createGoal.pending]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [createGoal.fulfilled]: (state, action) => {
      state.isLoading = false
      state.goals.push(action.payload)
    },
    [createGoal.rejected]: (state, action) => {
      state.isLoading = null
      state.isError = true
      state.message = action.payload.message
    },

    [getGoals.pending]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [getGoals.fulfilled]: (state, action) => {
      state.isLoading = false
      state.goals = action.payload
    },
    [getGoals.rejected]: (state, action) => {
      state.isLoading = null
      state.isError = true
      state.message = action.payload.message
    },

    [deleteGoal.pending]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [deleteGoal.fulfilled]: (state, action) => {
      state.isLoading = false
      state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
    },
    [deleteGoal.rejected]: (state, action) => {
      state.isLoading = null
      state.isError = true
      state.message = action.payload.message
    },

    [updateGoal.pending]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [updateGoal.fulfilled]: (state, action) => {
      state.isLoading = false
      state.goals = state.goals.map((goal) =>
        goal._id === action.payload._id ? action.payload : goal
      )
    },
    [updateGoal.rejected]: (state, action) => {
      state.isLoading = null
      state.isError = true
      state.message = action.payload.message
    },
  },
})

export const { resetGoalState } = goalSlice.actions
export default goalSlice.reducer
