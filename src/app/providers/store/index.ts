import { configureStore } from '@reduxjs/toolkit';
import auth from './config/authSlice';
import theme from './config/themeSlice';
import { useAppDispatch } from './config/hooks';
import { useAppSelector } from './config/hooks';

const store = configureStore({
    reducer: {
        auth,
        theme,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export { useAppDispatch, useAppSelector };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
