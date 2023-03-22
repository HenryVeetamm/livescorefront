import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { playerApi } from './api';
import map from 'lodash/map';


type PlayersState= {
  players: any
}

export const playerSlice = createSlice({
  name:'player',
  initialState: { } as PlayersState,
  reducers: {
    setPlayerData: (state, { payload }) => {
      const { teamId, result, changedData } : any = payload;
      console.log(changedData);
      const newArray = map(state.players[teamId], (player: any) => player.id === result.id ? result: player);
      state.players[teamId] = newArray;
    },
    setPlayers: (state, { payload }) => {
      const { teamId, result } : any = payload;
      state.players[teamId] = result;
    }
  },

  extraReducers: (builder) => {
    builder.addMatcher(playerApi.endpoints.getGamePlayers.matchFulfilled, (state, { payload }) => {
      const { teamId, result } : any = payload;
      if (state.players) {
        if (state.players[teamId]) {
          state.players[teamId] = result;
        }else {
          state.players = {
            ...state.players,
            [teamId]: result
          };
        }
      }else {
        state.players = {
          [teamId]: result
        };
      }
    });

    builder.addMatcher(playerApi.endpoints.managePlayerScore.matchFulfilled, (state, { payload }) => {
      const { teamId, result } : any = payload;
      const newArray = map(state.players[teamId], (player: any) => player.id === result.id ? result: player);
      state.players[teamId] = newArray;
    });
  }
});

export const actions = playerSlice.actions;

export const selectors = {
  getPlayers: (state: RootState, teamId: string) => state.player && state.player.players && state.player.players[teamId]
};


