import styles from './cardRecipes.module.css'
import recipeImage from '../../../assets/cooking.png'

const CardRecipes = () => {
  return (
    <div className={styles.principal_recipes}>
      <div className={styles.principal2}>
        <div className={styles.contenedor_imageR}>
          <img src={recipeImage} alt='Not found' loading='lazy' />
        </div>
      </div>
      <h1>Recipes</h1>
    </div>
  )
}

export default CardRecipes
