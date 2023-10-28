import styles from './createRecipe.module.css'
import useRecipes from '../../../hooks/useRecipes'
import { useSubmit } from '../../../hooks/useSubmit'
import { useNavigate } from 'react-router-dom'

const CreateRecipe = () => {
  const { notRepeatCuisines, notRepeatdishTypes } = useRecipes()
  const navigate = useNavigate()
  const {
    formik,
    diets,
    handleSelectedDiet,
    handleSelectedCuisine,
    handleSelectedDishType,
    handleDelete,
    handleAddStep,
    handleCurrentStepChange,
  } = useSubmit()

  const backHome = ()=>{
    navigate('/recipes')
  }

  return (
    <div>
      <div className={styles.contenedor_principal}>
        <h1>CreateRecipe</h1>
        <div>
          <div className={styles.container_form}>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit(e)
              }}
            >
              <label htmlFor=''>
                Nombre
                <input
                  placeholder='Nombre de receta'
                  type='text'
                  name='name'
                  id='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {formik.errors.name}
                </div>
              ) : null}

              <label htmlFor=''>
                Imagen
                <input
                  placeholder='Selecciona una imagen'
                  type='text'
                  name='image'
                  id='image'
                  value={formik.values.image}
                  onChange={formik.handleChange}
                />
              </label>

              <label htmlFor=''>
                Resumen del Plato
                <textarea
                  placeholder='Resumen del plato'
                  name='summary'
                  id='sumamry'
                  value={formik.values.summary}
                  onChange={formik.handleChange}
                  cols='30'
                  rows='10'
                  onBlur={formik.handleBlur}
                ></textarea>
              </label>

              {formik.touched.summary && formik.errors.summary ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {formik.errors.summary}
                </div>
              ) : null}

              <label htmlFor=''>
                Nivel Saludable
                <input
                  type='range'
                  name='healthScore'
                  id='healthScore'
                  value={formik.values.healthScore}
                  onChange={formik.handleChange}
                  min={0}
                  max={100}
                />
              </label>
              <div>
                <p>{formik.values.healthScore}%</p>
              </div>

              {formik.touched.healthScore && formik.errors.healthScore ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {formik.errors.healthScore}
                </div>
              ) : null}

              <label htmlFor=''>
                Pasos
                <input
                  type='text'
                  value={formik.values.currentStep}
                  onChange={handleCurrentStepChange}
                  placeholder='Ingresa los pasos'
                />
                <button
                  type='button'
                  onClick={handleAddStep}
                  className={styles.btn2}
                >
                  Add Step
                </button>
              </label>

              <div className={styles.steps}>
                {formik.values.steps?.map((step, index) => (
                  <div key={index} className={styles.inter}>
                    <button onClick={() => handleDelete('steps', step, event)}>
                      X
                    </button>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <label htmlFor=''>Tipo de Dieta</label>
              <select
                name='diets'
                id='diets'
                onChange={(e) => handleSelectedDiet(e)}
                onBlur={formik.handleBlur}
              >
                <option value=''>Selecciona una opcion</option>
                {diets?.map((diet) => (
                  <option value={diet} key={diet}>
                    {diet}
                  </option>
                ))}
              </select>

              <div className={styles.steps}>
                {formik.values.diets.map((diet, index) => (
                  <div key={index} className={styles.inter}>
                    <button onClick={() => handleDelete('diets', diet, event)}>
                      X
                    </button>
                    <p>{diet}</p>
                  </div>
                ))}
              </div>

              {formik.touched.diets && formik.errors.diets ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {formik.errors.diets}
                </div>
              ) : null}

              <label htmlFor=''>Tipo de Cocina</label>
              <select
                name='cuisines'
                id='cuisines'
                onChange={(e) => handleSelectedCuisine(e)}
              >
                <option value=''>Selecciona una opcion</option>
                {notRepeatCuisines?.map((cuisine) => (
                  <option value={cuisine} key={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>

              <div className={styles.steps}>
                {formik.values.cuisines.map((cuisine, index) => (
                  <div key={index} className={styles.inter}>
                    <button
                      onClick={() => handleDelete('cuisines', cuisine, event)}
                    >
                      X
                    </button>
                    <p>{cuisine}</p>
                  </div>
                ))}
              </div>

              <label htmlFor=''>Tipo de Plato</label>
              <select
                name='dishTypes'
                id='dishTypes'
                onChange={(e) => handleSelectedDishType(e)}
              >
                <option value=''>Selecciona una opcion</option>
                {notRepeatdishTypes?.map((dish) => (
                  <option value={dish} key={dish}>
                    {dish}
                  </option>
                ))}
              </select>

              <div className={styles.steps}>
                {formik.values.dishTypes.map((dishType, index) => (
                  <div key={index} className={styles.inter}>
                    <button
                      onClick={() => handleDelete('dishTypes', dishType, event)}
                    >
                      X
                    </button>
                    <p>{dishType}</p>
                  </div>
                ))}
              </div>

              <button type='submit' className={styles.btn}>
                Crear Receta
              </button>
              <button onClick={backHome} className={styles.btn}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe
