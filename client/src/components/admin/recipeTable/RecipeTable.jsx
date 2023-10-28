/* eslint-disable no-prototype-builtins */
import { Link } from 'react-router-dom'
import styles from './recipeTable.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { saveRecipes } from '../../../../redux/slices/getRecipes'
import { deleteRecipeAsync } from '../../../../redux/slices/deleteRecipe'
import Swal from 'sweetalert2'

const RecipeTable = () => {
  const dispatch = useDispatch()
  const recipesDb = useSelector((state) => state.recipes.list)

  const filteredRecipes = recipesDb.filter((recipe) =>
    recipe.hasOwnProperty('create')
  )

  // console.log(filteredRecipes.length);

  useEffect(() => {
    dispatch(saveRecipes())
  }, [dispatch])

  const deleteRecipe = async (id) => {
    const result = await Swal.fire({
      title: '¿Deseas eliminar esta receta?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    })

    if (result.isConfirmed) {
      await dispatch(deleteRecipeAsync(id))
      dispatch(saveRecipes())
      Swal.fire('Receta eliminada', '', 'success')
    }
  }

  return (
    <div>
      <div>
        <h1>Recipe Table</h1>
      </div>
      <div className={styles.butons2}>
        <Link to='/adminhome'>
          <button>Admin Pannel</button>
        </Link>
        <Link to='/create'>
          <button>New Recipe</button>
        </Link>
      </div>

      <div className={styles.container_recipes}>
        <table className={styles.table_recipe}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          {filteredRecipes.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan='2' style={{textAlign: "center", fontWeight: 600}}>Sin recetas aún</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredRecipes &&
                filteredRecipes?.map((recip) => (
                  <tr key={recip.id}>
                    <td>{recip.id}</td>
                    <td>{recip.name}</td>
                    <td>
                      <Link to={`/updaterecipe/${recip.id}`} >
                      <button className={styles.update_button2}>Update</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className={styles.delete_button2}
                        onClick={() => deleteRecipe(recip.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default RecipeTable
