import { useDispatch, useSelector } from 'react-redux'
import styles from './register.module.css'
import { addUsers } from '../../../redux/slices/auth/registerUser'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { totalRoles } from '../../../redux/slices/users/getRoles'
// import jwt_decode from 'jwt-decode'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const roles = useSelector((state) => state.roles.roleList)

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(totalRoles())
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      roles: ['user']
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
        if (!token) {
          navigate('/login')
        } else {
          navigate('/users')
        }
      } catch (error) {
        console.error('aca el error', error)
      }
    }
  })

  const handleSelectedRole = useCallback(
    (e) => {
      const slectedRole = e.target.value
      formik.setFieldValue('roles', [slectedRole])
    },
    [formik]
  )

  return (
    <>
      <div className={styles.register_cont}>
        <h1>Registrate</h1>
        <div className={styles.container2_form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              formik.handleSubmit(e)
            }}
            className={styles.form_register}
          >
            <label>
              Nombre completo
              <input
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu nombre'
              />
            </label>

            {formik.touched.name && formik.errors.name ? (
              <div className={styles.errors}>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}

            <label>
              Username
              <input
                type='text'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu nombre de usuario'
              />
            </label>

            {formik.touched.username && formik.errors.username ? (
              <div className={styles.errors}>
                <p>{formik.errors.username}</p>
              </div>
            ) : null}

            <label>
              Correo electronico
              <input
                type='text'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu email'
              />
            </label>

            {formik.touched.email && formik.errors.email ? (
              <div className={styles.errors}>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <label>
              Contraseña
              <input
                type='password'
                name='password'
                autoComplete='on'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ingresa tu password'
              />
            </label>

            {formik.touched.password && formik.errors.password ? (
              <div className={styles.errors}>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            {token === null ? (
              ''
            ) : (
              <>
                <label htmlFor=''>Roles</label>
                <select
                  name='roles'
                  id='roles'
                  onChange={(e) => handleSelectedRole(e)}
                >
                  <option value=''>Selecciona un rol</option>
                  {roles.map((el) => (
                    <option value={el.name} key={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className={styles.butons}>
              {token === null ? (
                <Link to={'/'}>
                  <button className={styles.btn_user}>Cancelar</button>
                </Link>
              ) : (
                <Link to={'/users'}>
                  <button className={styles.btn_user}>Cancelar</button>
                </Link>
              )}
              <button type='submit' className={styles.btn_user}>
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
