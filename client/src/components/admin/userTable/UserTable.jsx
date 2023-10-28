import styles from './userTable.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { totalUsers } from '../../../../redux/slices/users/getAllUsers'
import { Link } from 'react-router-dom'
import { deleteUserAsync } from '../../../../redux/slices/users/deleteUser'
import Swal from 'sweetalert2'

const UserTable = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.userList)
  console.log(typeof users)

  useEffect(() => {
    dispatch(totalUsers())
  }, [dispatch])

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Deseas eliminar este usuario?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      })
      // console.log(result);

      if (result.isConfirmed) {
        await dispatch(deleteUserAsync(id))
        dispatch(totalUsers())
        Swal.fire('Usuario eliminado', '', 'success')
      }
    } catch (error) {
      console.error('Error al eliminar el usuario', error)
    }
  }

  return (
    <div>
      <div>
        <h1>User Table</h1>
      </div>
      <div className={styles.butons}>
        <Link to='/adminhome'>
          <button className={styles.admin}>Admin Pannel</button>
        </Link>
        <Link to='/register'>
          <button className={styles.new_user}>New User</button>
        </Link>
      </div>
      <div className={styles.container_table}>
        {!users ? (
          <tbody>
            <tr>
              <td colSpan='2' style={{ textAlign: 'center', fontWeight: 600 }}>
                Sin usuarios aún
              </td>
            </tr>
          </tbody>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.roles.map((el) => el.name)}</td>
                    <td>
                      <Link to={`/updateuser/${user.id}`}>
                        <button className={styles.update_button}>Update</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className={styles.delete_button}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default UserTable
