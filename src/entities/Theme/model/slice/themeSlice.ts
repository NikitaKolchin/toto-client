import { PayloadAction, SliceSelectors, createSlice } from '@reduxjs/toolkit';

export type ThemeState = {
    darkTheme: boolean;
    rowsOnPage: number;
};

const initialState: ThemeState = {
    darkTheme: localStorage.getItem('darkTheme') === 'true' || false,
    rowsOnPage: Number(localStorage.getItem('rowsOnPage')) || 10,
};

export const themeSlice = createSlice<
    ThemeState,
    {
        toggleTheme: (state: ThemeState) => void;
        initTheme: (state: ThemeState, action: PayloadAction<boolean>) => void;
        setRowsOnPage: (
            state: ThemeState,
            action: PayloadAction<number>,
        ) => void;
    },
    'theme',
    SliceSelectors<ThemeState>,
    'theme'
>({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state: ThemeState) => {
            localStorage.setItem('darkTheme', (!state.darkTheme).toString());
            state.darkTheme = !state.darkTheme;
        },
        setRowsOnPage: (state: ThemeState, action: PayloadAction<number>) => {
            localStorage.setItem('rowsOnPage', action.payload.toString());
            state.rowsOnPage = action.payload;
        },
        initTheme: (state: ThemeState, action: PayloadAction<boolean>) => {
            const darkThemeFromStorage = localStorage.getItem('darkTheme');
            if (darkThemeFromStorage) {
                state.darkTheme = darkThemeFromStorage === 'true';
            } else {
                localStorage.setItem('darkTheme', action.payload.toString());
                state.darkTheme = action.payload;
            }
        },
    },
});

export const { toggleTheme, initTheme, setRowsOnPage } = themeSlice.actions;

export const { reducer } = themeSlice;
