import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { gameApi } from './api';
import { GameDto, SetDto } from './types';
import isEmpty from 'lodash/isEmpty';

type GameSliceType = {
  connection?: boolean,
  gameId?: string,
  game?: GameDto,
  currentSet?: SetDto,
  viewersCount?: number,
  totalSets?: SetDto[]
}

export const gameSlice = createSlice({
  name:'game',
  initialState: { } as GameSliceType,
  reducers: {
    setConnect : (state, { payload } : PayloadAction<any>) => {
      state.gameId = payload.gameId;
      state.connection = true;
    },
    setDisconnect : (state) => {
      state.connection = false;
    },
    setGameCurrentSet: (state, { payload } : PayloadAction<any>) => {
      state.currentSet = payload;
    },
    setViewersCounts: (state, { payload }) =>{
      state.viewersCount = payload;
    },
    setGame: (state, { payload }) =>{
      state.game = { ...state.game, ...payload };
    },
    clearGame: (state) => {
      state.currentSet = undefined;
      state.game = undefined;
      state.totalSets = undefined;
      state.viewersCount = undefined;
      state.gameId = undefined;
    },
    setNewSet: (state, { payload }) => {
      if (state.totalSets && !isEmpty(state.totalSets) && state.currentSet) state.totalSets = [ ...state.totalSets, state.currentSet ];
      else if (state.currentSet) state.totalSets = [ state.currentSet ];
      state.currentSet = payload;
    },
    endGame: (state, { payload }) => {
      state.game = payload;
      if (state.totalSets && !isEmpty(state.totalSets) && state.currentSet) state.totalSets = [ ...state.totalSets, state.currentSet ];
      else if (state.currentSet) state.totalSets = [ state.currentSet ];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(gameApi.endpoints.getGame.matchFulfilled, (state, { payload }) => {
      state.game = payload;
    });
    builder.addMatcher(gameApi.endpoints.startGame.matchFulfilled, (state, { payload }) => {
      state.currentSet = payload;
    });
    builder.addMatcher(gameApi.endpoints.manageGameScore.matchFulfilled, (state, { payload }) => {
      state.currentSet = payload;
    });
    builder.addMatcher(gameApi.endpoints.getCurrentSet.matchFulfilled, (state, { payload }) => {
      if (payload) state.currentSet = payload;
    });
    builder.addMatcher(gameApi.endpoints.getCompletedSetsByGameId.matchFulfilled, (state, { payload }) => {
      console.log(payload, 'completedsets');
      state.totalSets = payload;
    });
    // builder.addMatcher(gameApi.endpoints.startNewSet.matchFulfilled, (state, { payload }) => {
    //   if (state.totalSets && !isEmpty(state.totalSets)) state.totalSets = [ ...state.totalSets, state.currentSet ];
    //   else state.totalSets = [ state.currentSet ];
    //   state.currentSet = payload;
    // });
    builder.addMatcher(gameApi.endpoints.endGame.matchFulfilled, (state, { payload }) => {
      state.game = payload;
      if (state.totalSets && state.currentSet) state.totalSets = [ ...state.totalSets, state.currentSet ];
      else if (state.currentSet) state.totalSets = [ state.currentSet ];
    });
  }
});

export const actions = gameSlice.actions;

export const selectors = {
  getTeamId: (state: RootState) => state.team.team?.id,
  getGame: (state: RootState) => state.game.game,
  getCurrentSet: (state: RootState) => state.game.currentSet,
  getViwersCount: (state: RootState) => state.game.viewersCount,
  getAllGameSets: (state: RootState) => state.game.totalSets
};


