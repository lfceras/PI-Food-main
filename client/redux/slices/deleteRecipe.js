import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const deleteRecipeAsync = createAsyncThunk(
  'delete/deleteRecipeAsync',
  async (id) => {
    try {
      let headers = {
        'x-access-token': localStorage.getItem('token')
      }
      await axios.delete(`http://localhost:3001/recipes/${id}`, { headers })
    } catch (error) {
      console.error(error)
    }
  }
)

export const deleteRecipeSlice = createSlice({
  name: 'deleteRecipe',
  initialState: {
    recipe: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteRecipeAsync.fulfilled, (state, action) => {
      state.recipe = action.payload
    })
  }
})

export default deleteRecipeSlice.reducer
