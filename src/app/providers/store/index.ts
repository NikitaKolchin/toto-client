import { configureStore } from '@reduxjs/toolkit';
import { auth } from 'entities/Auth';
import { theme } from 'entities/Theme';
import { useAppDispatch } from 'shared/store/config';
import { useAppSelector } from 'shared/store/config';
import { competitionsApi } from 'entities/Competition';
import { usersApi, authApi } from 'entities/Auth';

const store = configureStore({
    reducer: {
        auth,
        theme,
        [competitionsApi.reducerPath]: competitionsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(competitionsApi.middleware)
            .concat(usersApi.middleware)
            .concat(authApi.middleware),
});

export default store;
export { useAppDispatch, useAppSelector };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
