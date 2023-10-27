/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './updateUser.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  clearUserDetail,
  getUser
} from '../../../../redux/slices/users/getUserById'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { updateUserAsync } from '../../../../redux/slices/users/updateUser'
import Swal from 'sweetalert2'

const UpdateUser = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userById.user)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser(id))

    return () => {
      dispatch(clearUserDetail())
    }
  }, [dispatch, id])

  const schemaValidation = Yup.object({
    name: Yup.string().required('Este campo es obligatorio'),
    username: Yup.string().required('Este campo es obligatorio'),
    email: Yup.string()
      .email('El email no es valido')
      .required('Este campo es obligatorio')
  })

  return (
    <>
      <div className={styles.update_cont}>
        <h1>Actualizar Usuario</h1>
        <div className={styles.container_update_form}>
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={users ?? { name: '', username: '', email: '' }}
            onSubmit={async (valores) => {
              const result = await Swal.fire({
                title: '¿Deseas actualizar este usuario?',
                showCancelButton: true,
                confirmButtonText: 'Actualizar',
                cancelButtonText: 'Cancelar',
                icon: 'warning'
              })

              if (result.isConfirmed) {
                await dispatch(updateUserAsync({ id, values: valores }))
                navigate('/users')
              }
            }}
          >
            {(props) => {
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    props.handleSubmit()
                  }}
                  className={styles.form_update}
                >
                  <label>
                    Nombre
                    <input
                      type='text'
                      name='name'
                      value={props.values.name}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      placeholder='Ingresa tu nombre'
                    />
                  </label>

                  {props.touched.name && props.errors.name ? (
                    <div className={styles.errors}>
                      <p>{props.errors.name}</p>
                    </div>
                  ) : null}

                  <label>
                    Username
                    <input
                      type='text'
                      name='username'
                      value={props.values.username}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      placeholder='Ingresa tu nombre de usuario'
                    />
                  </label>

                  {props.touched.username && props.errors.username ? (
                    <div className={styles.errors}>
                      <p>{props.errors.username}</p>
                    </div>
                  ) : null}

                  <label>
                    Correo electronico
                    <input
                      type='email'
                      name='email'
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      placeholder='Ingresa tu email'
                    />
                  </label>

                  {props.touched.email && props.errors.email ? (
                    <div className={styles.errors}>
                      <p>{props.errors.email}</p>
                    </div>
                  ) : null}
                  <div className={styles.butons_update}>
                    <Link to={'/users'}>
                      <button className={styles.btn_user_update}>
                        Cancelar
                      </button>
                    </Link>

                    <button type='submit' className={styles.btn_user_update}>
                      Actualizar
                    </button>
                  </div>
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default UpdateUser
