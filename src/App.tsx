import { FC, useEffect, useState } from "react"
import LoginForm from "./components/LoginForm"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { IUser } from "./models/IUser"
import UserService from "./services/UserService"
import axios from "axios"
import { checkAuth, logout } from "./store/authSlice"

const App: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const { isLoading, error, isAuth, user } = useAppSelector(
    (state) => state.data
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get("/api/matches")
        console.log(resp.data)
      } catch (e) {
        console.log(e)
      }
    }

    if (localStorage.getItem("token")) {
      dispatch(checkAuth())
    }
    getData()
  }, [dispatch])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    console.error("случилось страшное: ", error)
  }
  if (!isAuth) {
    return (
      <div>
        <LoginForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    )
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
      <button onClick={() => dispatch(logout())}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  )
}

export default App
