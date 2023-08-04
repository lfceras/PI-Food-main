import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { useRef } from "react";
import { saveRecipes } from "../redux/slices/getRecipes";
import { setSearchTerm } from "../redux/slices/searchSlice";

const useSearch = () => {
  const [recipe, setRecipe] = useState("");
  const searchTerm = useSelector((state) => state.setSearch.searchTerm);
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (e) => {
      let valor = e.target.value;
      if (!valor.startsWith(" ")) {
        dispatch(setSearchTerm(valor));
        setRecipe(valor);
      }
    },
    [dispatch]
  );

  const debounceSearch = useRef(
    debounce((value) => {
      dispatch(saveRecipes(value));
    }, 400)
  ).current;

  useEffect(() => {
    if (searchTerm !== "") {
      debounceSearch(searchTerm);
    }
  }, [debounceSearch, dispatch, searchTerm]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (recipe.length) {
        dispatch(saveRecipes(recipe));
      }
    },
    [dispatch, recipe]
  );

  return {
    handleChange,
    handleSubmit,
    recipe,
    setRecipe,
  };
};

export default useSearch;
