import styles from './cardRecipes.module.css'
import recipeImage from '../../../assets/cooking.png'
import { Link } from 'react-router-dom'

const CardRecipes = () => {
  return (
    <div className={styles.principal_recipes}>
      <Link to='/recipes'  style={{textDecoration: "none", color: "black"}}>
      <div className={styles.principal2}>
        <div className={styles.contenedor_imageR}>
          <img src={recipeImage} alt='Not found' loading='lazy' />
        </div>
      </div>
      <h1>Recipes</h1>
      </Link>
    </div>
  )
}

export default CardRecipes
