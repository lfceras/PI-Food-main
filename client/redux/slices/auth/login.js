import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

const LOG_USER = `http://localhost:3001/auth/login`
const initialState = {
  login: [],
  error: '',
  loading: false
}

export const logUser = createAsyncThunk('users/logUser', async (payload) => {
  try {
    const response = await axios.post(LOG_USER, payload)
    localStorage.setItem('token', response.data?.data.token)
    Swal.fire({
      icon: 'success',
      title: `${response.data.data.msg}`
    })
    return response.data
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: `Error: ${error.response?.data?.data.msg || 'Error desconocido'}`
    })
  }
})

export const loginUsuer = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logUser.fulfilled, (state, action) => {
        state.loading = false
        state.login = action.payload
      })
      .addCase(logUser.rejected, (state, action) => {
        state.loading = false, 
        state.error = action.error.message
      })
  }
})

export default loginUsuer.reducer
