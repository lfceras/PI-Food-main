import { configureStore } from '@reduxjs/toolkit'
import recipes from '../slices/getRecipes'
import createRecipe from '../slices/createRecipe.js'
import page from '../slices/currentPage'
import setSearch from '../slices/searchSlice'
import recipesById from '../slices/getRecipesById'
import registerUser from '../slices/auth/registerUser.js'
import loginUsuer from '../slices/auth/login.js'
import diets from '../slices/getDiets.js'
import users from '../slices/users/getAllUsers.js'
import roles from "../slices/users/getRoles.js"
import deleteUSer from '../slices/users/deleteUser.js'
import userById from "../slices/users/getUserById.js"
import updateUser from "../slices/users/updateUser.js"

export const store = configureStore({
  reducer: {
    recipes: recipes,
    diets: diets,
    page: page,
    setSearch: setSearch,
    recipesById: recipesById,
    create: registerUser,
    login: loginUsuer,
    createRecipe: createRecipe,
    users: users,
    roles: roles,
    deleteUSer: deleteUSer,
    userById: userById,
    updateUser: updateUser
  }
})
