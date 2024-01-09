import { colors, createTheme } from '@mui/material';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: colors.blue[800] },
        secondary: { main: colors.purple.A700 },
        background: {
            paper: colors.blue[50],
        },
        text: {
            primary: colors.blue[500],
            secondary: colors.blue[100],
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#222',
        },
        text: {
            primary: '#fff',
        },
    },
});
