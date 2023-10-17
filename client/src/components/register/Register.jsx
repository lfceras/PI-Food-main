import { useDispatch } from 'react-redux'
import styles from './register.module.css'
import { addUsers } from '../../../redux/slices/auth/registerUser'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Este campo es obligatorio'),
      username: Yup.string().required('Este campo es obligatorio'),
      email: Yup.string()
        .email('El email no es valido')
        .required('Este campo es obligatorio'),
      password: Yup.string()
        .required('Este campo es obligatorio')
        .min(6, 'El password debe ser de al menos 6 caracteres')
    }),
    onSubmit: async (valores) => {
      try {
        await dispatch(addUsers(valores))
        navigate('/login')
      } catch (error) {
        console.error('aca el error', error)
      }
    }
  })

  return (
    <>
      <div className={styles.register_cont}>
        <label className={styles.tittle}>Registrate</label>
        <div className={styles.register_form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              formik.handleSubmit(e)
            }}
          >
            <div className={styles.inputs}>
              <label>Nombre completo</label>
              <input
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu nombre'
              />

              {formik.touched.name && formik.errors.name ? (
                <div className={styles.errors}>
                  <p>{formik.errors.name}</p>
                </div>
              ) : null}

              <label>Username</label>
              <input
                type='text'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu nombre de usuario'
              />

              {formik.touched.username && formik.errors.username ? (
                <div className={styles.errors}>
                  <p>{formik.errors.username}</p>
                </div>
              ) : null}

              <label>Correo electronico</label>
              <input
                type='text'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu email'
              />

              {formik.touched.email && formik.errors.email ? (
                <div className={styles.errors}>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <label>Contraseña</label>
              <input
                type='password'
                name='password'
                autoComplete='on'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu password'
              />

              {formik.touched.password && formik.errors.password ? (
                <div className={styles.errors}>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
            </div>

            <div className={styles.butons}>
              <Link to={'/login'}>
                <button>Cancelar</button>
              </Link>
              <button type='submit'>Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
