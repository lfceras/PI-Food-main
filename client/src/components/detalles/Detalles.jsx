import styles from './detalles.module.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { recipesById } from '../../../redux/slices/getRecipesById'
import NavBar from '../navbar/NavBar'
import Loading2 from '../loading2/Loading2'

const Detalles = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const detalles = useSelector((state) => state.recipesById.detalles)

  useEffect(() => {
    setLoading(true)
    dispatch(recipesById(id)).then(() => {
      setLoading(false)
    })
  }, [dispatch, id])

  return (
    <>
      <NavBar />
      {loading ? (
        <Loading2 />
      ) : (
        <div className={styles.principal_con}>
          <div className={styles.inter_content}>
            <div className={styles.container_title}>
              <span>{detalles?.name}</span>
              <img src={detalles?.image} alt='Not found' />
            </div>

            <div className={styles.summary}>
              <p>{detalles?.summary}</p>
            </div>

            <div className={styles.container_cuisines}>
              <div className={styles.cuisines}>
                <span>Cuisines</span>
                <br />
                {detalles?.cuisines.length === 0
                  ? 'No hay cocinas asociadas'
                  : detalles?.cuisines.map((el, index) => (
                      <ul key={index}>
                        <li>{el}</li>
                      </ul>
                    ))}
              </div>

              <div className={styles.dishTypes}>
                <span>DishTypes</span>
                {detalles?.dishTypes &&
                  detalles?.dishTypes.map((el, index) => (
                    <ul key={index}>
                      <li>{el}</li>
                    </ul>
                  ))}
              </div>
            </div>

            <div className={styles.diets}>
              <span>Diets</span>
              {Array.isArray(detalles?.diets) &&
                detalles?.diets.map((el, index) => (
                  <ul key={index}>
                    <li>
                      {index + 1} -{' '}
                      {el.name ? el.name : el}
                    </li>
                  </ul>
                ))}
            </div>
            <div className={styles.steps}>
              <span>Steps</span>
              {Array.isArray(detalles?.steps) &&
                detalles?.steps.map((el, index) => (
                  <ul key={index}>
                    <li>
                      {index + 1} -{' '}
                      {typeof el === 'string' ? el : 'Elemento no renderizable'}
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Detalles
