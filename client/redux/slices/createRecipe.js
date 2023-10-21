import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

const NEW_RECIPE_URL = `http://localhost:3001/recipes`

const initialState = {
  recipeCreate: [],
  error: '',
  loading: false
}

export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async (payload, { rejectWithValue }) => {

    const headers = {
      'x-access-token': localStorage.getItem('token')
    }

    try {
      const response = await axios.post(NEW_RECIPE_URL, payload, {headers})
      Swal.fire({
        icon: 'success',
        title: `${response.data.data.msg}`
      })
      return response.data.data
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `${error.response.data.data.msg}`
      })
      return rejectWithValue(error.response.data)
    }
  }
)

export const addsRecipes = createSlice({
  name: 'recipeCreate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRecipe.pending, (state) => {
        state.loading = true
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false
        state.recipeCreate = action.payload
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default addsRecipes.reducer
