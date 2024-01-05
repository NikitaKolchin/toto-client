import { FC, useEffect } from "react"
import { checkAuth } from "../../store/authSlice"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import { Link } from "react-router-dom"

type Props = {}

const Main: FC = (props: Props) => {
  const { isLoading, error, isAuth, user } = useAppSelector(
    (state) => state.auth
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

  return (
    <div>
      <h1>
        {isAuth ? `Пользователь авторизован ${user.email}` : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <h1>
        {user.isActivated
          ? "Аккаунт подтвержден по почте"
          : "ПОДТВЕРДИТЕ АККАУНТ!!!!"}
      </h1>
      <h1>
        {user.isAllowed
          ? "Участие подтверждено"
          : "Необходимо подтверждение участия"}
      </h1>
      <div>
        
            <Link to="profile">user</Link>
      </div>
    </div>
  )
}

export default Main
