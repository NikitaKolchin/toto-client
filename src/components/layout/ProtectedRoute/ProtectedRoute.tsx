import { Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { useEffect } from 'react'
import { checkAuth } from '../../../store/authSlice'

const ProtectedRoute = () => {
  const { isLoading, error, isAuth, user } = useAppSelector(
    (state) => state.data
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
  if (!isAuth || !user.isActivated) { // || !user.isAllowed
    navigate('/')
  }

  return <Outlet />
}
export default ProtectedRoute