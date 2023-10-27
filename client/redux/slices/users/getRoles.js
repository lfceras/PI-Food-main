import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const allRoles = createSlice({
  name: 'roles',
  initialState: {
    roleList: []
  },
  reducers: {
    getAllRoles: (state, action)=>{
      state.roleList = action.payload
    }
  }
})

export const {getAllRoles} = allRoles.actions

export default allRoles.reducer

export const totalRoles = ()=>{ 
  // esta es la que utilizamos en el dispach del componente
  return async (dispatch)=>{
    try {
      let response = await axios.get(`http://localhost:3001/auth/roles`)
      let roles = response?.data.data

      dispatch(getAllRoles(roles))
    } catch (error) {
      console.error(error);
    }
  }
}