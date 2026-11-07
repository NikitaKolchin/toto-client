import {
	configureStore,
	createListenerMiddleware,
	isAnyOf,
} from "@reduxjs/toolkit";
import { competitionsApi } from "@/entities/Competition";
import { matchesApi } from "@/entities/Match";
import { stakesApi } from "@/entities/MatchStake";
import { settingsApi } from "@/entities/Setting";
import { teamsApi } from "@/entities/Team";
import { theme } from "@/entities/Theme";
import { authApi, resultApi, rolesApi, user, usersApi } from "@/entities/User";

const apis = [
	competitionsApi,
	usersApi,
	authApi,
	rolesApi,
	teamsApi,
	settingsApi,
	matchesApi,
	stakesApi,
	resultApi,
] as const;

// После выхода кеш запросов принадлежит прежнему пользователю (участие, выбранный
// турнир, ставки) — сбрасываем его, чтобы следующий вход в той же вкладке не видел чужих данных.
const logoutListener = createListenerMiddleware();
logoutListener.startListening({
	matcher: isAnyOf(
		authApi.endpoints.logout.matchFulfilled,
		authApi.endpoints.logout.matchRejected,
	),
	effect: (_action, listenerApi) => {
		for (const api of apis) {
			listenerApi.dispatch(api.util.resetApiState());
		}
	},
});

const store = configureStore({
	reducer: {
		user,
		theme,
		[competitionsApi.reducerPath]: competitionsApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[rolesApi.reducerPath]: rolesApi.reducer,
		[teamsApi.reducerPath]: teamsApi.reducer,
		[settingsApi.reducerPath]: settingsApi.reducer,
		[matchesApi.reducerPath]: matchesApi.reducer,
		[stakesApi.reducerPath]: stakesApi.reducer,
		[resultApi.reducerPath]: resultApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
			.prepend(logoutListener.middleware)
			.concat(competitionsApi.middleware)
			.concat(usersApi.middleware)
			.concat(authApi.middleware)
			.concat(rolesApi.middleware)
			.concat(teamsApi.middleware)
			.concat(settingsApi.middleware)
			.concat(matchesApi.middleware)
			.concat(stakesApi.middleware)
			.concat(resultApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
