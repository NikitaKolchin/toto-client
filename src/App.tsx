import { FC } from "react"
import Main from "./pages/Main/Main"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/layout/ProtectedRoute/ProtectedRoute"
import ProfileScreen from "./components/containers/ProfileScreen/ProfileScreen"
import { BrowserRouter } from 'react-router-dom'
import LoginForm from "./components/containers/LoginForm/LoginForm"

const App: FC = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<LoginForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
