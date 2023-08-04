import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useCallback } from "react";
import { setCurrentPage } from "../redux/slices/currentPage";
import { setSearchTerm } from "../redux/slices/searchSlice";
import { saveRecipes } from "../redux/slices/getRecipes";

const usePaginado = () => {
  const dispatch = useDispatch();
  const pageNumberLimit = 2;
  const recipesPerPage = 8;
  const [maxPageLimit, setMaxPageLimit] = useState(pageNumberLimit);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const recipes = useSelector((state) => state.recipes.list);
  const searchTerm = useSelector((state) => state.setSearch.searchTerm);
  const currentPage = useSelector((state) => state.page.page);

  const currentRecipes = useMemo(() => {
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    return recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  }, [recipes, currentPage, recipesPerPage]);

  // const totalRecipes = recipes.length
  // const totalPages = Math.ceil(totalRecipes / recipesPerPage)

  const paginado = useCallback(
    (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    },
    [dispatch]
  );

  const onPrevClick = useCallback(() => {
    if (currentPage > 1) {
      // Si currentPage es mayor que 1, podemos realizar el cambio de página hacia atrás.
      dispatch(setCurrentPage(currentPage - 1));
    }
  }, [currentPage, dispatch]);

  // const onNextClick = useCallback(() => {
  //   if (currentPage < totalPages ) {
  //     dispatch(setCurrentPage(currentPage + 1));

  //     if(currentPage + 1 > maxPageLimit){
  //       setMaxPageLimit(maxPageLimit + pageNumberLimit);
  //       setMinPageLimit(minPageLimit + pageNumberLimit);
  //     }
  //   }
  // },[currentPage, dispatch, maxPageLimit, minPageLimit, totalPages])

  const onNextClick = useCallback(() => {
    dispatch(setCurrentPage(currentPage + 1));
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(saveRecipes(searchTerm));

    setMaxPageLimit(currentPage + pageNumberLimit);
    setMinPageLimit(currentPage - pageNumberLimit);
  }, [currentPage, dispatch, pageNumberLimit, searchTerm]);

  return {
    currentRecipes,
    recipes,
    recipesPerPage,
    paginado,
    currentPage,
    maxPageLimit,
    minPageLimit,
    onPrevClick,
    onNextClick,
    pageNumberLimit,
  };
};

export default usePaginado;
