import { configureStore } from '@reduxjs/toolkit';
import { user } from 'entities/User';
import { theme } from 'entities/Theme';
import { competitionsApi } from 'entities/Competition';
import { usersApi, authApi } from 'entities/User';

const store = configureStore({
    reducer: {
        user,
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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
