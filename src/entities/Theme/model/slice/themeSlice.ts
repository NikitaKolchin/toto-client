import { PayloadAction, SliceSelectors, createSlice } from '@reduxjs/toolkit';

export type ThemeState = {
    darkTheme: boolean;
};

const initialState: ThemeState = {
    darkTheme: localStorage.getItem('darkTheme') === 'true' || false,
};

export const themeSlice = createSlice<
    ThemeState,
    {
        toggleTheme: (state: ThemeState) => void;
        initTheme: (state: ThemeState, action: PayloadAction<boolean>) => void;
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

export const { toggleTheme, initTheme } = themeSlice.actions;

export const { reducer } = themeSlice;
