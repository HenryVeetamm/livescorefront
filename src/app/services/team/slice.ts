import { createSlice } from '@reduxjs/toolkit';
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
};


