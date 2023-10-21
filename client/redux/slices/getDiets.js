import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const allDiets = createSlice({
  name: 'diets',
  initialState: {
    list: []
  },
  reducers: {
    getAllDiets: (state, action) => {
      state.list = action.payload
    }
  }
})

export const {getAllDiets} = allDiets.actions
export default allDiets.reducer

export const savedDiets = ()=>{
  return async (dispatch)=>{
    try {
      let response = await axios.get(`http://localhost:3001/diets`)
      const datos = response?.data.data
      dispatch(getAllDiets(datos))
    } catch (error) {
      console.error(error)
    }
  }
}