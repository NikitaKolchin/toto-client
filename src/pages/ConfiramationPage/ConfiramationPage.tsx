import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { login, registration } from "../../store/authSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

type Props = {}

const ConfiramationPage = (props: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error, isAuth } = useAppSelector(
      (state) => state.data
    )
  useEffect(() => {
  if (isAuth) {
      navigate('/profile')
  }
  }, [navigate, isAuth])
  return (
      <div>
         Подтверждение
      </div>
  );
}

export default ConfiramationPage