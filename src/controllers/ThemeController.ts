import { PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from '../app/providers/store/config/themeSlice';

export default class ThemeController {
    static initialState: ThemeState = {
        darkTheme: localStorage.getItem('darkTheme') === 'true' || false,
    };
    static toggleTheme = (state: ThemeState) => {
        localStorage.setItem('darkTheme', (!state.darkTheme).toString());
        state.darkTheme = !state.darkTheme;
    };

    static initTheme = (state: ThemeState, action: PayloadAction<boolean>) => {
        const darkThemeFromStorage = localStorage.getItem('darkTheme');
        if (darkThemeFromStorage) {
            state.darkTheme = darkThemeFromStorage === 'true';
        } else {
            localStorage.setItem('darkTheme', action.payload.toString());
            state.darkTheme = action.payload;
        }
    };
}
