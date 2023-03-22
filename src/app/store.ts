import { configureStore } from '@reduxjs/toolkit';
import { exceptionsMiddleware } from './middlewares/exceptionMiddleware';
import { onlineGameMiddleware } from './middlewares/onlineGameMiddleware';
import { gameApi } from './services/game';
import { gameSlice } from './services/game/slice';
import { playerApi, playerSlice } from './services/player';
import { sessionApi } from './services/session/api';
import { unauthMiddleware } from './services/session/middleware';
import { sessionSlice } from './services/session/slice';
import { teamApi, teamSlice } from './services/team';

export const store= configureStore({
  reducer: {
    [sessionApi.reducerPath]: sessionApi.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [playerApi.reducerPath]: playerApi.reducer,
    [playerSlice.name]: playerSlice.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [teamSlice.name]: teamSlice.reducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [gameSlice.name]: gameSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      onlineGameMiddleware,
      exceptionsMiddleware,
      unauthMiddleware,
      sessionApi.middleware,
      playerApi.middleware,
      teamApi.middleware,
      gameApi.middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;