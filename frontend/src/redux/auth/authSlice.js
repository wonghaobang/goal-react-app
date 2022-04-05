import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

const user = JSON.parse(localStorage.getItem("user"))

// Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user ? user : null,
    isError: false,
    isLoading: null,
    message: "",
  },
  reducers: {
    resetAuthState: (state) => {
      state.isError = false
      state.isLoading = null
      state.message = ""
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.isLoading = null
      state.isError = true
      state.message = action.payload.message
      state.user = null
    },

    [login.pending]: (state) => {
      state.isLoading = true
      state.isError = false
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.isLoading = null
      state.isError = true
      state.message = action.payload.message
      state.user = null
    },

    [logout.fulfilled]: (state) => {
      state.user = null
    },
  },
})

export const { resetAuthState } = authSlice.actions
export default authSlice.reducer

// https://blog.logrocket.com/using-redux-toolkits-createasyncthunk/
// https://tousu.in/qa/?qa=1149336/
// https://www.youtube.com/watch?v=XEn3ZMQM-Cw&list=PLM0LBHjz37LW_Wz3DPoT5-bm1btrBD1bu&index=8
