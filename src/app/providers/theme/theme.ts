import { colors, createTheme } from '@mui/material';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: colors.blue[800] },
        secondary: { main: colors.blue[50] },
        background: {
            paper: colors.blue[50],
        },
        text: {
            primary: colors.blue[800],
            secondary: colors.blue[50],
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: { main: colors.blue[50] },
        background: {
            paper: '#222',
        },
        text: {
            primary: '#fff',
        },
    },
});
