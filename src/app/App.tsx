import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './providers/theme';
import { useAppSelector } from './providers/store';
import { AppRouter } from './providers/router';

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
