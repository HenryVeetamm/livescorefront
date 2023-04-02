import { createApi } from '@reduxjs/toolkit/query/react';
import { buildBaseQuery } from '../../api';
import { AddUserDto, AppUserDto, UpdatePasswordDto } from './types';

const name = 'adminApi';


export const tags = {
  USERS: 'users'
};

export const adminApi = createApi({
  reducerPath: name,
  baseQuery: buildBaseQuery('admin'),
  refetchOnMountOrArgChange: true,
  tagTypes: Object.values(tags),
  endpoints: (builder) => ({
    getUsers: builder.query<AppUserDto[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: [ tags.USERS ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    addUser: builder.mutation<void, AddUserDto>({
      query: (values) => ({
        url: '/adduser',
        method: 'POST',
        body: values
      }),
      invalidatesTags: [ tags.USERS ],
      transformResponse: (response : any) => {
        return response;
      }
    }),
    updatePassword: builder.mutation<void, UpdatePasswordDto>({
      query: (values) => ({
        url: '/updatepassword',
        method: 'POST',
        body: values
      }),
      transformResponse: (response : any) => {
        return response;
      }
    })
  })
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdatePasswordMutation
} = adminApi;