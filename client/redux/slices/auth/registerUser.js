import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

const NEW_USER_URL = 'http://localhost:3001/auth/newuser'

const initialState = {
  create: [],
  error: '',
  loading: false
}

export const addUsers = createAsyncThunk(
  'users/addUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(NEW_USER_URL, payload)
      Swal.fire(`${response.data.data.msg}`, 'success')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const registerUser = createSlice({
  name: 'create',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default registerUser.reducer
