import { savedDiets } from '../redux/slices/getDiets.js'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { useFormik } from 'formik'
import { addRecipe } from '../redux/slices/createRecipe.js'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export const useSubmit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(savedDiets())
  }, [dispatch])

  const diets = useSelector((state) => state.diets.list)

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      summary: '',
      healthScore: '',
      steps: [],
      currentStep: '',
      diets: [],
      cuisines: [],
      dishTypes: []
    },
    validationSchema: Yup.object({
      name: Yup.string()
      .required('Este campo es obligatorio'),
      summary: Yup.string()
      .required('Este campo es obligatorio')
      .min(20,'Demasiado corto'),
      diets: Yup.array()
      .required("Selecciona al menos una receta"),
      healthScore: Yup.string()
      .required('Este campo es obligatorio'),
    }),
    onSubmit: async (valores) => {
      await dispatch(addRecipe(valores))
      navigate('/admihome')
    }
  })

  const handleCurrentStepChange = useCallback(
    (e) => {
      formik.setFieldValue('currentStep', e.target.value)
    },
    [formik]
  )

  const handleAddStep = useCallback(() => {
    const currentStep = formik.values.currentStep
    if (currentStep) {
      formik.setFieldValue('steps', [...formik.values.steps, currentStep])
      formik.setFieldValue('currentStep', '') // Resetea el campo de entrada
    }
  }, [formik])

  const handleSelectedDiet = useCallback(
    (e) => {
      const slectedDiet = e.target.value
      if (slectedDiet && !formik.values.diets.includes(slectedDiet)) {
        formik.setFieldValue('diets', [...formik.values.diets, slectedDiet])
      }
    },
    [formik]
  )

  const handleSelectedCuisine = useCallback(
    (e) => {
      const slectedCuisine = e.target.value
      if (slectedCuisine && !formik.values.cuisines.includes(slectedCuisine)) {
        formik.setFieldValue('cuisines', [
          ...formik.values.cuisines,
          slectedCuisine
        ])
      }
    },
    [formik]
  )

  const handleSelectedDishType = useCallback(
    (e) => {
      const slectedDishType = e.target.value
      if (
        slectedDishType &&
        !formik.values.dishTypes.includes(slectedDishType)
      ) {
        formik.setFieldValue('dishTypes', [
          ...formik.values.dishTypes,
          slectedDishType
        ])
      }
    },
    [formik]
  )

  const handleDelete = useCallback(
    (field, value, event) => {
      event.preventDefault();
      const updatedValues = formik.values[field].filter((e) => e !== value)
      formik.setFieldValue(field, updatedValues)
    },
    [formik]
  )

  return {
    formik,
    diets,
    handleSelectedDiet,
    handleSelectedCuisine,
    handleSelectedDishType,
    handleDelete,
    handleAddStep,
    handleCurrentStepChange
  }
}
