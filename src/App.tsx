import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './components/theme/theme';
import { useAppSelector } from './store/hooks';
import AppRouter from './components/router/AppRouter';

const App: FC = () => {
    const theme = useAppSelector((state) => state.theme);

    return (
        <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
