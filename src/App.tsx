import { FC } from "react"
import MainPage from "./pages/MainPage/MainPage"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/layout/ProtectedRoute/ProtectedRoute"
import ProfileScreen from "./pages/ProfilePage/ProfilePage"
import { BrowserRouter } from 'react-router-dom'
import LoginPage from "./pages/LoginPage/LoginPage"
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage"
import MainLayout from "./components/layout/MainLayout/MainLayout"
import StakesPage from "./pages/StakesPage/StakesPage"
import InfoPage from "./pages/InfoPage/InfoPage"
import ResultPage from "./pages/ResultPage/ResultPage"

const App: FC = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route element={<ProtectedRoute />}>        
          <Route path='/stakes' element={<StakesPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<ProfileScreen />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/info' element={<InfoPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/results' element={<ResultPage />} />
        </Route>
      </Route>  
    </Routes>
    </BrowserRouter>
  )
}

export default App
