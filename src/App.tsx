import { FC } from 'react';
import MainPage from './pages/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute/ProtectedRoute';
import ProfileScreen from './pages/ProfilePage/ProfilePage';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import MainLayout from './components/layout/MainLayout/MainLayout';
import StakesPage from './pages/StakesPage/StakesPage';
import InfoPage from './pages/InfoPage/InfoPage';
import ResultPage from './pages/ResultPage/ResultPage';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './components/theme/theme';
import { useAppSelector } from './store/hooks';
import ForgotPage from './pages/ForgotPage/ForgotPage';

const App: FC = () => {
    const theme = useAppSelector((state) => state.theme);

    return (
        <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/registration"
                            element={<RegistrationPage />}
                        />
                        <Route path="/forgot" element={<ForgotPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/stakes" element={<StakesPage />} />
                            <Route
                                path="/profile"
                                element={<ProfileScreen />}
                            />
                            <Route path="/info" element={<InfoPage />} />
                            <Route path="/results" element={<ResultPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
