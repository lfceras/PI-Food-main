import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const recipeById = createSlice({
  name: 'recipebyid',
  initialState: {
    detalles: {}
  },
  reducers: {
    getRecipesById: (state, action)=>{
      state.detalles = action.payload
    }
  }
})

export const {getRecipesById} = recipeById.actions
export default recipeById.reducer

export const recipesById = (id)=>{
  return async (dispatch)=>{
    try {
      let response = await axios.get(`http://localhost:3001/recipes/${id}`)
      // console.log(response);
      let dtos = response.data.data
      dispatch(getRecipesById(dtos))
    } catch (error) {
      console.error(error)
    }
      
  }
}


