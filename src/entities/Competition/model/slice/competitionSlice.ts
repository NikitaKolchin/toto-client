import { createSlice } from '@reduxjs/toolkit';
import { CurrentCompetition } from '../types/CurrentCompetition';
import { competitionsApi } from '../../services/queriesForCompetitions/queriesForCompetitions';

export const initialState: CurrentCompetition = {
    id: undefined,
    value: undefined,
};

const competitionSlice = createSlice({
    name: 'competition',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            competitionsApi.endpoints.getAllCompetitions.matchFulfilled,
            (state, { payload }) => {
                const currentCompetition = payload.find(
                    (competition) => competition.isCurrent === true,
                );
                state.id = currentCompetition?.id;
                state.value = currentCompetition?.value;
            },
        );
    },
});
export const { reducer } = competitionSlice;
