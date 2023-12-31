import { NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useEffect } from 'react'
import { checkAuth } from '../../../store/authSlice'

const ProtectedRoute = () => {
  const { isLoading, error, isAuth } = useAppSelector(
    (state) => state.data
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    console.error("случилось страшное: ", error)
  }
  // show unauthorized screen if no user is found in redux store
  if (!isAuth) {
    return (
      <div>
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to='/login'>Login</NavLink> to gain access
        </span>
      </div>
    )
  }

  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute