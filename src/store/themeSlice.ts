import { SliceSelectors, createSlice } from '@reduxjs/toolkit';

type ThemeState = {
    darkTheme: boolean;
};

export const themeSlice = createSlice<
    ThemeState,
    { toggleTheme: (state: ThemeState) => void },
    'theme',
    SliceSelectors<ThemeState>,
    'theme'
>({
    name: 'theme',
    initialState: {
        darkTheme: true,
    },
    reducers: {
        toggleTheme: (state) => {
            state.darkTheme = !state.darkTheme;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
