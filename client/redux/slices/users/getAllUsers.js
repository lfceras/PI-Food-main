import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const allUsers = createSlice({
  name: 'users',
  initialState: {
    userList: []
  },
  reducers: {
    getAllUsers: (state, action) => {
      state.userList = action.payload
    }
  }
})

export const { getAllUsers } = allUsers.actions

export default allUsers.reducer

export const totalUsers = () => {
  return async (dispatch) => {
    try {
      const headers = {
        'x-access-token': localStorage.getItem('token')
      }
      let response = await axios.get(`http://localhost:3001/auth/users`, { headers})

      const datas = response?.data.data

      console.log(datas)

      dispatch(getAllUsers(datas))
    } catch (error) {
      console.error(error)
    }
  }
}
