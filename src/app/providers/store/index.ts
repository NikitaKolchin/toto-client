import { configureStore } from '@reduxjs/toolkit';
import auth from './config/authSlice';
import theme from './config/themeSlice';
import { useAppDispatch } from './config/hooks';
import { useAppSelector } from './config/hooks';
import { competitionsApi } from '../../../shared/lib/rtkApi/rtk';

const store = configureStore({
    reducer: {
        auth,
        theme,
        [competitionsApi.reducerPath]: competitionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(competitionsApi.middleware),
});

export default store;
export { useAppDispatch, useAppSelector };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
