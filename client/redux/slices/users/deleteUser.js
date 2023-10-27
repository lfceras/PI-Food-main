import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const deleteUserAsync = createAsyncThunk(
  'deleteUser/deleteUserAsync',
  async (id, { getState }) => {
    try {
    
      await axios.delete(`http://localhost:3001/auth/users/${id}`)
      const users = getState().users.userList
      const updateUsers = users?.filter((el) => el.id !== id)
      return updateUsers
    } catch (error) {
      console.error(error)
    }
  }
)

export const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState: {
    users: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      state.users = action.payload
    })
  }
})

export default deleteUserSlice.reducer
