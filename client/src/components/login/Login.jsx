import styles from './login.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { logUser } from '../../../redux/slices/auth/login'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es valido')
        .required('Este campo es obligatorio'),
      password: Yup.string()
        .required('Este campo es obligatorio')
        .min(6, 'El password debe ser de al menos 6 caracteres')
    }),
    onSubmit: async (valores) => {
      const response = await dispatch(logUser(valores))
      if (response?.payload?.data?.success) {
        navigate('/home')
      }
    }
  })

  return (
    <div className={styles.container_p}>
      <div className={styles.container_form}>
        <h1>Login putitos</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            formik.handleSubmit(e)
          }}
        >
          <label htmlFor=''>Email</label>
          <input
            type='text'
            name='email'
            className={styles.inpt}
            placeholder='Email...'
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errors}>
              <p>{formik.errors.email}</p>
            </div>
          ) : null}

          <label htmlFor=''>Password</label>
          <input
            type='password'
            name='password'
            autoComplete='on'
            className={styles.inpt}
            placeholder='Password...'
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          {formik.touched.password && formik.errors.password ? (
            <div className={styles.errors}>
              <p>{formik.errors.password}</p>
            </div>
          ) : null}

          <button className={styles.btn1} type='submit'>
            Log In
          </button>
          <Link to={'/register'}>
            <button className={styles.btn1}>Register Now!</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login
