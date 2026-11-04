import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/shared/api/rtkApi/baseQueryWithReauth/baseQueryWithReauth";
import type { Nation } from "@/shared/api";
export const nationsApi = createApi({
	reducerPath: "nationsApi",
	refetchOnMountOrArgChange: true,
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Nations"],
	endpoints: (builder) => ({
		getNationById: builder.query<Nation, string>({
			query: (id) => `nations/${id}`,
		}),
		getAllNations: builder.query<Nation[], void>({
			query: () => `nations`,
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Nations", id }) as const),
							{ type: "Nations", id: "LIST" },
						]
					: [{ type: "Nations", id: "LIST" }],
		}),
		getNationsByCompetition: builder.query<Nation[], number>({
			query: (competitionId) => `nations?competitionId=${competitionId}`,
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Nations", id }) as const),
							{ type: "Nations", id: "LIST" },
						]
					: [{ type: "Nations", id: "LIST" }],
		}),
		updateNationById: builder.mutation<
			Nation,
			Partial<Nation> & Pick<Nation, "id">
		>({
			query: ({ id, ...patch }) => ({
				url: `nations/${id}`,
				method: "PATCH",
				body: patch,
			}),
			invalidatesTags: (_result, _error, { id }) => [{ type: "Nations", id }],
		}),
		addNation: builder.mutation<
			Nation,
			Partial<Nation> & { competitionId?: number }
		>({
			query({ competitionId, ...body }) {
				return {
					url: competitionId
						? `nations?competitionId=${competitionId}`
						: `nations`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: [{ type: "Nations", id: "LIST" }],
		}),
		uploadNations: builder.mutation<{ message: string }, number>({
			query(competitionId) {
				return {
					url: `nations/upload?competitionId=${competitionId}`,
					method: "POST",
				};
			},
			invalidatesTags: [{ type: "Nations", id: "LIST" }],
		}),
		updateNations: builder.mutation<{ message: string }, number>({
			query(competitionId) {
				return {
					url: `nations/update?competitionId=${competitionId}`,
					method: "POST",
				};
			},
			invalidatesTags: [{ type: "Nations", id: "LIST" }],
		}),
	}),
});

export const {
	useGetNationByIdQuery,
	useGetNationsByCompetitionQuery,
	useGetAllNationsQuery,
	useUpdateNationByIdMutation,
	useAddNationMutation,
	useUploadNationsMutation,
	useUpdateNationsMutation,
} = nationsApi;
