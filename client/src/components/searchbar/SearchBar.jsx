import styles from "./SearchBar.module.css";
import { IconContext } from "react-icons/lib";
import { BiSearchAlt2 } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveRecipes } from "../../../redux/slices/getRecipes";
import debounce from "lodash.debounce";
import { useRef } from "react";

const SearchBar = () => {
  const [recipe, setRecipe] = useState("");
  const [lastSearchedRecipe, setLastSearchedRecipe] = useState("");

  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    let valor = e.target.value;
    if (!valor.startsWith(" ")) {
      setRecipe(valor);
    }
  }, []);

  const debounceSearch = useRef(
    debounce(
      (value) => {
        dispatch(saveRecipes(value));
        setLastSearchedRecipe(value);
      },
      [400]
    )
  ).current;

  useEffect(() => {
    if (recipe !== lastSearchedRecipe) {
      debounceSearch(recipe);
    }
  }, [recipe, debounceSearch, dispatch, lastSearchedRecipe]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (recipe.length) {
        dispatch(saveRecipes(recipe));
      }
    },
    [dispatch, recipe]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.search}>
          <div className={styles.test}>
            <input
              type="text"
              name="name"
              value={recipe}
              onChange={handleChange}
            />
            <div className={styles.icon}>
              <IconContext.Provider value={{ size: "20px" }}>
                <BiSearchAlt2 />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
