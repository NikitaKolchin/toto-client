import { configureStore } from '@reduxjs/toolkit';
import { auth } from 'entities/Auth';
import { theme } from 'entities/Theme';
import { useAppDispatch } from './config/hooks';
import { useAppSelector } from './config/hooks';
import { competitionsApi } from 'entities/Competition/services/queriesForCompetitions/queriesForCompetitions';
import { usersApi } from 'entities/Auth/services/queriesForUser/queriesForUser';

const store = configureStore({
    reducer: {
        auth,
        theme,
        [competitionsApi.reducerPath]: competitionsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(competitionsApi.middleware)
            .concat(usersApi.middleware),
});

export default store;
export { useAppDispatch, useAppSelector };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
