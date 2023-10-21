import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const allRecipes = createSlice({
  name: 'recipes',
  initialState: {
    list: []
  },
  reducers: {
    getAllRecipes: (state, action) => {
      state.list = action.payload.sort((a, b) => a.name.localeCompare(b.name))
    }
  }
})

export const { getAllRecipes } = allRecipes.actions

export default allRecipes.reducer

export const saveRecipes = (search = null) => {
  return async (dispatch) => {
    try {
      let response
      // const headers = {
      //   'x-access-token': localStorage.getItem('token')
      // }
      if (search) {
        response = await axios.get(
          `http://localhost:3001/recipes?search=${search}`)
      } else {
        response = await axios.get(`http://localhost:3001/recipes` )
      }
      const dtos = response.data.data
      dispatch(getAllRecipes(dtos))
    } catch (error) {
      console.error(error)
      // Swal.fire(`${error.response.data.data.msg}`)
    }
  }
}
