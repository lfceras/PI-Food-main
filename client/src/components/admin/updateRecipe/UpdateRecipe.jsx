/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import useRecipes from '../../../../hooks/useRecipes'
import styles from './updateRecipe.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { recipesById } from '../../../../redux/slices/getRecipesById'
import { Formik } from 'formik'
import * as Yup from 'yup'

const UpdateRecipe = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { notRepeatCuisines, notRepeatdishTypes } = useRecipes()
  const navigate = useNavigate()

  const detalles = useSelector((state) => state.recipesById.detalles)

  const backHome = () => {
    navigate('/recipes')
  }

  useEffect(() => {
    dispatch(recipesById(id))
  }, [dispatch, id])

  const schemaValidation = Yup.object({
    name: Yup.string().required('Este campo es obligatorio'),
    summary: Yup.string()
      .required('Este campo es obligatorio')
      .min(20, 'Demasiado corto'),
    healthScore: Yup.string().required('Este campo es obligatorio')
  })

  return (
    <div>
      <div className={styles.contenedor_principal_update}>
        <h1>Update Recipe</h1>
        <div>
          <div className={styles.container_form_update}>
            <Formik
              validationSchema={schemaValidation}
              enableReinitialize
              initialValues={detalles}
            >
              {(props) => {
                console.log(props)
                return (
                  <form
                    className={styles.form_update}
                    onSubmit={(e) => {
                      e.preventDefault()
                      // props.handleSubmit(e)
                    }}
                  >
                    <label>
                      Nombre
                      <input
                        type='text'
                        name='name'
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder='Nombre de receta'
                      />
                    </label>
                    {props.touched.name && props.errors.name ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {props.errors.name}
                </div>
              ) : null}

                    <label>
                      Imagen
                      <input
                        placeholder='Selecciona una imagen'
                        type='text'
                        name='image'
                        id='image'
                        value={props.values.image}
                        onChange={props.handleChange}
                      />
                    </label>

                    <label >
                      Resumen del Plato
                      <textarea
                        placeholder='Resumen del plato'
                        name='summary'
                        id='sumamry'
                        value={props.values.summary}
                        onChange={props.handleChange}
                        cols='30'
                        rows='10'
                        onBlur={props.handleBlur}
                      ></textarea>
                    </label>

                    {/* {formik.touched.summary && formik.errors.summary ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {formik.errors.summary}
                </div>
              ) : null} */}

                    <label >
                      Nivel Saludable
                      <input
                        type='range'
                        name='healthScore'
                        id='healthScore'
                        value={props.values.healthScore}
                        onChange={props.handleChange}
                        min={0}
                        max={100}
                        onBlur={props.handleBlur}
                      />
                    </label>
                    <div>
                      <p>{props.values.healthScore}%</p>
                    </div>

                    {/* {formik.touched.healthScore && formik.errors.healthScore ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {formik.errors.healthScore}
                </div>
              ) : null} */}

                    <label >
                      Pasos
                      <input
                        type='text'
                        // value={formik.values.currentStep}
                        // onChange={handleCurrentStepChange}
                        placeholder='Ingresa los pasos'
                      />
                      <button
                        type='button'
                        // onClick={handleAddStep}
                        className={styles.btn2_update}
                      >
                        Add Step
                      </button>
                    </label>

                    <div className={styles.steps_update}>
                      {/* {formik.values.steps?.map((step, index) => (
                  <div key={index} className={styles.inter}>
                    <button onClick={() => handleDelete('steps', step, event)}>
                      X
                    </button>
                    <p>{step}</p>
                  </div>
                ))} */}
                    </div>

                    <label>Tipo de Dieta</label>
                    <select
                      name='diets'
                      id='diets'
                      // onChange={(e) => handleSelectedDiet(e)}
                      // onBlur={formik.handleBlur}
                    >
                      <option value=''>Selecciona una opcion</option>
                      {/* {diets?.map((diet) => (
                  <option value={diet} key={diet}>
                    {diet}
                  </option>
                ))} */}
                    </select>

                    <div className={styles.steps_update}>
                      {/* {formik.values.diets.map((diet, index) => (
                  <div key={index} className={styles.inter}>
                    <button onClick={() => handleDelete('diets', diet, event)}>
                      X
                    </button>
                    <p>{diet}</p>
                  </div>
                ))} */}
                    </div>

                    {/* {formik.touched.diets && formik.errors.diets ? (
                <div style={{ color: "red", fontSize: 13, width: "238px" }}>
                  {formik.errors.diets}
                </div>
              ) : null} */}

                    <label >Tipo de Cocina</label>
                    <select
                      name='cuisines'
                      id='cuisines'
                      // onChange={(e) => handleSelectedCuisine(e)}
                    >
                      <option value=''>Selecciona una opcion</option>
                      {notRepeatCuisines?.map((cuisine) => (
                        <option value={cuisine} key={cuisine}>
                          {cuisine}
                        </option>
                      ))}
                    </select>

                    <div className={styles.steps_update}>
                      {/* {formik.values.cuisines.map((cuisine, index) => (
                  <div key={index} className={styles.inter}>
                    <button
                      onClick={() => handleDelete('cuisines', cuisine, event)}
                    >
                      X
                    </button>
                    <p>{cuisine}</p>
                  </div>
                ))} */}
                    </div>

                    <label >Tipo de Plato</label>
                    <select
                      name='dishTypes'
                      id='dishTypes'
                      // onChange={(e) => handleSelectedDishType(e)}
                    >
                      <option value=''>Selecciona una opcion</option>
                      {notRepeatdishTypes?.map((dish) => (
                        <option value={dish} key={dish}>
                          {dish}
                        </option>
                      ))}
                    </select>

                    <div className={styles.steps_update}>
                      {/* {formik.values.dishTypes.map((dishType, index) => (
                  <div key={index} className={styles.inter}>
                    <button
                      onClick={() => handleDelete('dishTypes', dishType, event)}
                    >
                      X
                    </button>
                    <p>{dishType}</p>
                  </div>
                ))} */}
                    </div>

                    <button type='submit' className={styles.btn_update}>
                      Crear Receta
                    </button>
                    <button onClick={backHome} className={styles.btn_update}>
                      Cancelar
                    </button>
                  </form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateRecipe
