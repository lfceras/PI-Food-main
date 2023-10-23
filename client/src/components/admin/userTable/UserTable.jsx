import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {totalUsers} from '../../../../redux/slices/users/getAllUsers'


const UserTable = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(totalUsers())
  },[dispatch])
  return (
    <div>
      <div>
        
      </div>
      <h1>User Table</h1>
    </div>
  )
}

export default UserTable
