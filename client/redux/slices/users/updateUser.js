import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  userUpdate: [],
  error: '',
  loading: false
}

export const updateUserAsync = createAsyncThunk(
  'updateUser/updateUserAsync',
  async ({ id, values }) => {
    // console.log('ID:', id)
    // console.log('UserData:', values)
    try {
      let response = await axios.put(
        `http://localhost:3001/auth/users/updateuser/${id}`,
        values
      )
      const { data } = response
      return data.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)

export const updateUserSlice = createSlice({
  name: 'updateuser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true
      })

      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.userUpdate = action.payload
      })

      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default updateUserSlice.reducer
