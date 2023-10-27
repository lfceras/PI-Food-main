import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userId = createSlice({
  name: "userById",
  initialState: {
    user: []
  },
  reducers: {  
    getUserById: (state, action)=>{
      state.user = action.payload
    },
    clearUserDetail: (state) => {
      state.user = [];
    }
  }
})

export const {getUserById, clearUserDetail} = userId.actions
export default userId.reducer

export const getUser = (id)=> {
  return async (dispatch)=> {
    try {
      let response = await axios.get(`http://localhost:3001/auth/users/${id}`)
      const datos = response.data.data
      // console.log(datos);
      dispatch(getUserById(datos))
    } catch (error) {
      console.error(error);
    }
  }
}