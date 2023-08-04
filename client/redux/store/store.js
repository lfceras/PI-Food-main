import {configureStore} from '@reduxjs/toolkit'
import recipes from '../slices/getRecipes'
import page from '../slices/currentPage'
import setSearch from '../slices/searchSlice'

export const store = configureStore({
  reducer : {
    recipes: recipes,
    page: page,
    setSearch: setSearch
  }
})