import { configureStore } from '@reduxjs/toolkit';
import { theme } from 'entities/Theme';
import { competition, competitionsApi } from 'entities/Competition';
import { user, usersApi, authApi, rolesApi } from 'entities/User';
import { settingsApi } from 'entities/Setting';
import { nationsApi } from 'entities/Nation';
import { matchesApi } from 'entities/Match';

const store = configureStore({
    reducer: {
        user,
        competition,
        theme,
        [competitionsApi.reducerPath]: competitionsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [rolesApi.reducerPath]: rolesApi.reducer,
        [nationsApi.reducerPath]: nationsApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer,
        [matchesApi.reducerPath]: matchesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(competitionsApi.middleware)
            .concat(usersApi.middleware)
            .concat(authApi.middleware)
            .concat(rolesApi.middleware)
            .concat(nationsApi.middleware)
            .concat(settingsApi.middleware)
            .concat(matchesApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
