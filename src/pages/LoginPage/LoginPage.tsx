import { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { login } from "../../store/authSlice"
import { useNavigate } from "react-router-dom"

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error, isAuth } = useAppSelector((state) => state.data)
  useEffect(() => {
    if (isAuth) {
      navigate("/profile")
    }
  }, [navigate, isAuth])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    console.error("случилось страшное: ", error)
  }
  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
      />
      <button onClick={() => dispatch(login({ email, password }))}>
        Логин
      </button>
    </div>
  )
}

export default LoginForm
