import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { DecodedData } from 'app/types/DecodedToken';
import jwtDecode from 'jwt-decode';
import { teamApi } from '../team';
import { sessionApi } from './api';

type SessionState = {
  firstName?: string | null ,
  lastName?: string | null ,
  role?: string | null ,
  teamId?: string | null ,
}

export const sessionSlice = createSlice({
  name:'session',
  initialState: { firstName : null, lastName: null , role:  null } as SessionState,
  reducers: { setAuthData: (state, { payload } : PayloadAction<DecodedData>) => {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.role = payload.role;
  },
  logOut: (state) => {
    state.firstName = undefined;
    state.lastName = undefined;
    state.role = undefined;
    state.teamId = undefined;
  }
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const decoded : any = jwtDecode(payload.token);
      state.firstName = decoded['given_name'];
      state.lastName = decoded['family_name'];
      state.role = decoded['role'];
    });
    builder.addMatcher(teamApi.endpoints.getUserTeamId.matchFulfilled, (state, { payload }) => {
      state.teamId = payload;
    });
  } });

export const actions = sessionSlice.actions;

export const selectors = {
  getAuthData: (state: RootState) => state.session,
  isAuthenticated: (state: RootState) => state.session.firstName != null,
  getUserTeamId: (state: RootState) => state.session.teamId
};


