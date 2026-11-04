import { createApi } from "@reduxjs/toolkit/query/react";
import type { Match, ResultHeader } from "@/shared/api";
import { baseQueryWithReauth } from "@/shared/api/rtkApi/baseQueryWithReauth/baseQueryWithReauth";
export const matchesApi = createApi({
	reducerPath: "matchesApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Matches"],
	endpoints: (builder) => ({
		getMatchById: builder.query<Match, string>({
			query: (id) => `matches/${id}`,
		}),
		getAllMatches: builder.query<Match[], number | undefined>({
			query: (competitionId) =>
				competitionId ? `matches?competitionId=${competitionId}` : "matches",
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Matches", id }) as const),
							{ type: "Matches", id: "LIST" },
						]
					: [{ type: "Matches", id: "LIST" }],
		}),
		getAllMatchesForResult: builder.query<ResultHeader[], number | undefined>({
			query: (competitionId) =>
				competitionId
					? `matches/resultHeaders?competitionId=${competitionId}`
					: "matches/resultHeaders",
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Matches", id }) as const),
							{ type: "Matches", id: "LIST" },
						]
					: [{ type: "Matches", id: "LIST" }],
		}),
		updateMatchById: builder.mutation<
			Match,
			Partial<Match> & Pick<Match, "id"> & { competitionId?: number }
		>({
			query: ({ id, competitionId, ...patch }) => ({
				url: competitionId
					? `matches/${id}?competitionId=${competitionId}`
					: `matches/${id}`,
				method: "PATCH",
				body: patch,
			}),
			invalidatesTags: (_result, _error, { id }) => [{ type: "Matches", id }],
		}),
		addMatch: builder.mutation<Match, Partial<Match>>({
			query(body) {
				return {
					url: `matches`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: [{ type: "Matches", id: "LIST" }],
		}),
		deleteMatch: builder.mutation<
			void,
			{ id: Match["id"]; competitionId?: number }
		>({
			query: ({ id, competitionId }) => ({
				url: competitionId
					? `matches/${id}?competitionId=${competitionId}`
					: `matches/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (_result, _error, { id }) => [{ type: "Matches", id }],
		}),
		uploadMatches: builder.mutation<{ message: string }, number | undefined>({
			query(competitionId) {
				return {
					url: competitionId
						? `matches/upload?competitionId=${competitionId}`
						: "matches/upload",
					method: "POST",
				};
			},
			invalidatesTags: [{ type: "Matches", id: "LIST" }],
		}),
	}),
});

export const {
	useGetMatchByIdQuery,
	useGetAllMatchesQuery,
	useGetAllMatchesForResultQuery,
	useUpdateMatchByIdMutation,
	useAddMatchMutation,
	useDeleteMatchMutation,
	useUploadMatchesMutation,
} = matchesApi;
