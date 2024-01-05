import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import theme from './themeSlice';

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
