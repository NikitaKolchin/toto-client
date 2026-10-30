import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, type Result } from "@/shared/api";
export const resultApi = createApi({
	reducerPath: "ResultApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Result"],
	refetchOnMountOrArgChange: true,
	endpoints: (builder) => ({
		getResult: builder.query<Result[], number | undefined>({
			query: (competitionId) =>
				competitionId
					? `users/result?competitionId=${competitionId}`
					: "users/result",
		}),
	}),
});

export const { useGetResultQuery } = resultApi;
