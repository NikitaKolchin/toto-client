import { FC } from "react"
import MainPage from "./pages/MainPage/MainPage"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/layout/ProtectedRoute/ProtectedRoute"
import ProfileScreen from "./pages/ProfilePage/ProfilePage"
import { BrowserRouter } from 'react-router-dom'
import LoginPage from "./pages/LoginPage/LoginPage"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"

const App: FC = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
