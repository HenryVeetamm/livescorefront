import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { teamApi } from './api';
import { TeamDto } from './types';

type TeamSliceType = {
  team: TeamDto | undefined,
}

export const teamSlice = createSlice({
  name:'team',
  initialState: { } as TeamSliceType,
  reducers: {
    setTeam : (state, { payload }: PayloadAction<TeamDto|undefined>) => {
      state.team = payload;
      if (state.team) state.team.lambiNumber = 1;
    },
    clearTeam: (state) => state.team = undefined
  },
  extraReducers: (builder) => {
    builder.addMatcher(teamApi.endpoints.getMyTeam.matchFulfilled, (state, { payload }) => {
      state.team = payload;
    });
  }
});

export const actions = teamSlice.actions;

export const selectors = {
  getTeamId: (state: RootState) => state.team.team?.id,
  getIncrementCount: (state: RootState) => state.team.team?.lambiNumber
};


