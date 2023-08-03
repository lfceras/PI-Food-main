import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const allRecipes = createSlice({
  name: "recipes",
  initialState: {
    list: [],
  },
  reducers: {
    getAllRecipes: (state, action) => {
      state.list = action.payload.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
});

export const { getAllRecipes, sortRecipes } = allRecipes.actions;

export default allRecipes.reducer;

export const saveRecipes = (name = null) => {
  return async (dispatch) => {
    try {
      let response;
      if (name) {
        response = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      } else {
        response = await axios.get(`http://localhost:3001/recipes`);
      }
      const dtos = response.data.data;
      dispatch(getAllRecipes(dtos));
    } catch (error) {
      console.error(error);
    }
  };
};
