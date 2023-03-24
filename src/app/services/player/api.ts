import { createApi } from '@reduxjs/toolkit/query/react';
import { basePath, buildBaseQuery } from '../../api';
import { AddingToGame, AddPlayerDto, EditPlayerDto, ManagePlayerScoreDto, PlayerDto, PlayerInGameDto, PlayerStatistics, PlayersTransferDto } from './types';

const name = 'playerApi';

export const tags = {
  MY_PLAYERS: 'MY_PLAYERS',
  GAME_PLAYERS: 'GAME_PLAYERS',
};

export const pictureUploadUrl = `${basePath}/player/:id/picture`;

export const playerApi = createApi({
  reducerPath: name,
  baseQuery: buildBaseQuery('player'),
  tagTypes: Object.values(tags),
  endpoints: (builder) => ({
    getMyTeamPlayers: builder.query<PlayerDto[], void>({
      query: () => ({
        url: '/my-team',
        method: 'GET',
      }),
      providesTags: [ tags.MY_PLAYERS ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    addPlayer: builder.mutation<PlayerDto, AddPlayerDto>({
      query: (values) => ({
        url: '',
        method: 'POST',
        body: values
      }),
      invalidatesTags: [ tags.MY_PLAYERS ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    editPlayer: builder.mutation<PlayerDto, EditPlayerDto>({
      query: (values) => ({
        url: '',
        method: 'PUT',
        body: values
      }),
      invalidatesTags: [ tags.MY_PLAYERS ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getGamePlayers: builder.query<PlayersTransferDto, any>({
      query: (values) => ({
        url: `/game/${values.gameId}/team/${values.teamId}`,
        method: 'GET',
      }),
      providesTags: [ tags.GAME_PLAYERS ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getForAddingToGame: builder.query<AddingToGame[], any>({
      query: (values) => ({
        url: `/my-team/game/${values.gameId}`,
        method: 'GET',
      }),
      providesTags: [ tags.MY_PLAYERS ],
      transformResponse: (response : any) => {

        return response;
      }
    }),
    managePlayerScore: builder.mutation<PlayerInGameDto, ManagePlayerScoreDto>({
      query: (values) => ({
        url: `/${values.playerId}/team/${values.teamId}/game/${values.gameId}`,
        method: 'POST',
        body: values
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getTeamPlayers: builder.query<PlayerDto[], string>({
      query: (value) => ({
        url: `/team/${value}`,
        method: 'GET',
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getPlayerStatistics: builder.query<PlayerStatistics, string>({
      query: (value) => ({
        url: `${value}/statistics`,
        method: 'GET',
      }),
      transformResponse: (response : any) => {
        return response;
      }
    }),
  })
});

export const {
  useGetMyTeamPlayersQuery,
  useAddPlayerMutation,
  useEditPlayerMutation,
  useGetGamePlayersQuery,
  useGetForAddingToGameQuery,
  useManagePlayerScoreMutation,
  useGetTeamPlayersQuery,
  useLazyGetPlayerStatisticsQuery
} = playerApi;