import { createApi } from '@reduxjs/toolkit/query/react';
import map from 'lodash/map';
import { basePath, buildBaseQuery } from '../../api';
import { AddTeamDto, TeamDto, UpdateTeamDto, } from './types';

const name = 'teamApi';

export const tags = {
  TEAM: 'TEAM',
  TEAMS: 'TEAMS',
  MY_TEAM: 'MY_TEAM',
};

export const teamLogoUploadUrl = `${basePath}/team/:id/logo`;

export const teamApi = createApi({
  reducerPath: name,
  baseQuery: buildBaseQuery('team'),
  tagTypes: Object.values(tags),
  endpoints: (builder) => ({
    createMyTeam: builder.mutation<TeamDto, AddTeamDto>({
      query: (values) => ({
        url: '',
        method: 'POST',
        body: values
      }),
      invalidatesTags: [ tags.TEAM, tags.TEAMS, tags.MY_TEAM ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    updateMyTeam: builder.mutation<TeamDto, UpdateTeamDto>({
      query: (values) => ({
        url: '',
        method: 'PUT',
        body: values
      }),
      invalidatesTags: [ tags.TEAM, tags.TEAMS ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getMyTeam: builder.query<TeamDto, void>({
      query: () => ({
        url: 'my-team',
        method: 'GET'
      }),
      providesTags: [ tags.TEAM ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getTeams: builder.query<any[], void>({
      query: () => ({
        url: '',
        method: 'GET'
      }),
      transformResponse: (response : any) => {

        const mapped = map(response, (team) => {
          return { label: team.name, value: team.id };
        });
        return mapped;
      }
    }),
    getAllTeams: builder.query<TeamDto[], void>({
      query: () => ({
        url: '/all',
        method: 'GET'
      }),
      providesTags: [ tags.TEAMS ],
      transformResponse: (response : any) => {

        return response;
      }
    }),
    getUserTeamId: builder.query<string, void>({
      query: () => ({
        url: '/userteamId',
        method: 'GET'
      }),
      providesTags: [ tags.MY_TEAM ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    getTeamById: builder.query<TeamDto, string>({
      query: (value) => ({
        url: `/${value}`,
        method: 'GET'
      }),
      transformResponse: (response : any) => {
        return response;
      }
    })
  })
});

export const {
  useCreateMyTeamMutation,
  useGetMyTeamQuery,
  useUpdateMyTeamMutation,
  useGetTeamsQuery,
  useGetAllTeamsQuery,
  useGetUserTeamIdQuery,
  useLazyGetUserTeamIdQuery,
  useGetTeamByIdQuery,
} = teamApi;