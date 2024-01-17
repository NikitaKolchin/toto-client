import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './providers/theme/theme';
import { useAppSelector } from './providers/store/hooks';
import AppRouter from './providers/router/ui/AppRouter';

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
