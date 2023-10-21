import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { saveRecipes } from '../redux/slices/getRecipes'

const useRecipes = () => {
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipes.list)

  let disponibleCusines = recipes?.flatMap((el) => el.cuisines)
  let notRepeatCuisines = [...new Set(disponibleCusines)]

  let disponibledishTypes = recipes?.flatMap((el) => el.dishTypes)
  let notRepeatdishTypes = [...new Set(disponibledishTypes)]

  useEffect(() => {
    dispatch(saveRecipes())
  }, [dispatch])
  return {
    recipes,
    notRepeatCuisines,
    notRepeatdishTypes
  }
}

export default useRecipes
