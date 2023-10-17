import {configureStore} from '@reduxjs/toolkit'
import recipes from '../slices/getRecipes'
import page from '../slices/currentPage'
import setSearch from '../slices/searchSlice'
import recipesById  from '../slices/getRecipesById'
import registerUser from '../slices/auth/registerUser.js'
import loginUsuer from '../slices/auth/login.js'

export const store = configureStore({
  reducer : {
    recipes: recipes,
    page: page,
    setSearch: setSearch,
    recipesById: recipesById,
    create: registerUser,
    login: loginUsuer,
  }
})