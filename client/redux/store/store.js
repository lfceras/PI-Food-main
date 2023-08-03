import {configureStore} from '@reduxjs/toolkit'
import recipes from '../slices/getRecipes'

export const store = configureStore({
  reducer : {
    recipes: recipes
  }
})