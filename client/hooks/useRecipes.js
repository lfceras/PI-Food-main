import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { saveRecipes } from "../redux/slices/getRecipes";

const useRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.list);
  useEffect(() => {
    dispatch(saveRecipes());
  }, [dispatch]);
  return {
    recipes,
  };
};

export default useRecipes;
