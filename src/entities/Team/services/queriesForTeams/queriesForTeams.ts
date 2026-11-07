import { createApi } from "@reduxjs/toolkit/query/react";
import type { Team } from "@/shared/api";
import { baseQueryWithReauth } from "@/shared/api/rtkApi/baseQueryWithReauth/baseQueryWithReauth";
export const teamsApi = createApi({
	reducerPath: "teamsApi",
	refetchOnMountOrArgChange: true,
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Teams"],
	endpoints: (builder) => ({
		getTeamById: builder.query<Team, string>({
			query: (id) => `teams/${id}`,
		}),
		getAllTeams: builder.query<Team[], void>({
			query: () => `teams`,
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Teams", id }) as const),
							{ type: "Teams", id: "LIST" },
						]
					: [{ type: "Teams", id: "LIST" }],
		}),
		getTeamsByCompetition: builder.query<Team[], number>({
			query: (competitionId) => `teams?competitionId=${competitionId}`,
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Teams", id }) as const),
							{ type: "Teams", id: "LIST" },
						]
					: [{ type: "Teams", id: "LIST" }],
		}),
		updateTeamById: builder.mutation<Team, Partial<Team> & Pick<Team, "id">>({
			query: ({ id, ...patch }) => ({
				url: `teams/${id}`,
				method: "PATCH",
				body: patch,
			}),
			invalidatesTags: (_result, _error, { id }) => [{ type: "Teams", id }],
		}),
		addTeam: builder.mutation<Team, Partial<Team> & { competitionId?: number }>(
			{
				query({ competitionId, ...body }) {
					return {
						url: competitionId
							? `teams?competitionId=${competitionId}`
							: `teams`,
						method: "POST",
						body,
					};
				},
				invalidatesTags: [{ type: "Teams", id: "LIST" }],
			},
		),
		uploadTeams: builder.mutation<{ message: string }, number>({
			query(competitionId) {
				return {
					url: `teams/upload?competitionId=${competitionId}`,
					method: "POST",
				};
			},
			invalidatesTags: [{ type: "Teams", id: "LIST" }],
		}),
		updateTeams: builder.mutation<{ message: string }, number>({
			query(competitionId) {
				return {
					url: `teams/update?competitionId=${competitionId}`,
					method: "POST",
				};
			},
			invalidatesTags: [{ type: "Teams", id: "LIST" }],
		}),
	}),
});

export const {
	useGetTeamByIdQuery,
	useGetTeamsByCompetitionQuery,
	useGetAllTeamsQuery,
	useUpdateTeamByIdMutation,
	useAddTeamMutation,
	useUploadTeamsMutation,
	useUpdateTeamsMutation,
} = teamsApi;
