import { configureStore } from '@reduxjs/toolkit';
import { theme } from 'entities/Theme';
import { competition, competitionsApi } from 'entities/Competition';
import { user, usersApi, authApi, rolesApi, resultApi } from 'entities/User';
import { settingsApi } from 'entities/Setting';
import { nationsApi } from 'entities/Nation';
import { matchesApi } from 'entities/Match';
import { stakesApi } from 'entities/MatchStake';

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
        [stakesApi.reducerPath]: stakesApi.reducer,
        [resultApi.reducerPath]: resultApi.reducer,
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
            .concat(matchesApi.middleware)
            .concat(stakesApi.middleware)
            .concat(resultApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
