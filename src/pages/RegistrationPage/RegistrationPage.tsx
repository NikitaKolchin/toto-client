import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { registration } from "../../store/authSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

type Props = {}

const RegistrationPage = (props: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error, user } = useAppSelector(
      (state) => state.data
    )
  useEffect(() => {
    if (user.email) {
        navigate('/login')
    }
  }, [navigate, user])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    console.error("случилось страшное: ", error)
  }
  return (
      <div>
          <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder='Email'
          />
          <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Пароль'
          />
          <button onClick={() => dispatch(registration({email, password}))}>
              Регистрация
          </button>
      </div>
  );
}

export default RegistrationPage