import { createApi } from '@reduxjs/toolkit/query/react';
import { buildBaseQuery } from '../../api';
import { AddGameDto, AddPlayerToGameDto, GameDto, ManageGameScoreDto, SearhcDto, SetDto } from './types';

const name = 'gameApi';

export const tags = {
  GAMES: 'GAMES',
  GAME: 'GAME',
  MYGAMES: 'MYGAMES',
};

export const gameApi = createApi({
  reducerPath: name,
  baseQuery: buildBaseQuery('game'),
  tagTypes: Object.values(tags),
  endpoints: (builder) => ({
    addGame: builder.mutation<GameDto, AddGameDto>({
      query: (values) => ({
        url: '',
        method: 'POST',
        body: values
      }),
      invalidatesTags: [ tags.GAMES, tags.MYGAMES ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    addPlayerToGame: builder.mutation<AddGameDto, AddPlayerToGameDto>({
      query: (values) => ({
        url: `/${values.gameId}/player`,
        method: 'POST',
        body: values
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getGames: builder.query<GameDto[], SearhcDto>({
      query: (values) => ({
        url: `?page=${values.page}&pageSize=${values.pageSize}`,
        method: 'GET',
      }),
      providesTags: [ tags.GAMES ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getGame: builder.query<GameDto, string>({
      query: (gameId) => ({
        url: `/${gameId}`,
        method: 'GET',
      }),
      providesTags: [ tags.GAME ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    manageGameScore: builder.mutation<SetDto, ManageGameScoreDto>({
      query: (values) => ({
        url: `/${values.gameId}/add-score`,
        method: 'POST',
        body: values
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    startGame: builder.mutation<SetDto, string>({
      query: (gameId) => ({
        url: `/${gameId}/start-game`,
        method: 'POST',
      }),
      invalidatesTags: [ tags.GAMES ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    startNewSet: builder.mutation<SetDto, string>({
      query: (gameId) => ({
        url: `/${gameId}/startnewset`,
        method: 'POST',
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getCurrentSet: builder.query<SetDto, string>({
      query: (gameId) => ({
        url: `/${gameId}/currentset`,
        method: 'GET',
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getMyGames: builder.query<GameDto[], void>({
      query: () => ({
        url: '/my-games',
        method: 'GET',
      }),
      providesTags: [ tags.MYGAMES ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getCompletedSetsByGameId: builder.query<SetDto[], string>({
      query: (gameId) => ({
        url: `/${gameId}/completedsets`,
        method: 'GET',
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    endGame: builder.mutation<GameDto, string>({
      query: (gameId) => ({
        url: `/${gameId}/endgame`,
        method: 'POST',
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    deleteGame: builder.mutation<GameDto, string>({
      query: (gameId) => ({
        url: `/${gameId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ tags.GAMES, tags.MYGAMES ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
  })
});

export const {
  useAddGameMutation,
  useGetGamesQuery,
  useGetGameQuery,
  useAddPlayerToGameMutation,
  useManageGameScoreMutation,
  useStartGameMutation,
  useStartNewSetMutation,
  useGetCurrentSetQuery,
  useLazyGetGameQuery,
  useGetMyGamesQuery,
  useGetCompletedSetsByGameIdQuery,
  useEndGameMutation,
  useLazyGetGamesQuery,
  useDeleteGameMutation,
} = gameApi;