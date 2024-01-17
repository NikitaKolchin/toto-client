import { PayloadAction, SliceSelectors, createSlice } from '@reduxjs/toolkit';
import ThemeController from '../../../controllers/ThemeController';

export type ThemeState = {
    darkTheme: boolean;
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
    initialState: ThemeController.initialState,
    reducers: {
        toggleTheme: ThemeController.toggleTheme,
        initTheme: ThemeController.initTheme,
    },
});

export const { toggleTheme, initTheme } = themeSlice.actions;

export default themeSlice.reducer;
