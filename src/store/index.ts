import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';

const store = configureStore({
    reducer: {
        data: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
