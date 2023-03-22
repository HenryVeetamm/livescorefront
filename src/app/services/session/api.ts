import { createApi } from '@reduxjs/toolkit/query/react';
import { Global } from '../../../constants/global';
import { buildBaseQuery } from '../../api';
import { Session, LoginDto } from './types';

const name = 'sessionApi';

export const sessionApi = createApi({
  reducerPath: name,
  baseQuery: buildBaseQuery('session'),
  endpoints: (builder) => ({
    login: builder.mutation<Session, LoginDto>({
      query: (values) => ({
        url: 'login',
        method: 'POST',
        body: values
      }),
      transformResponse: (response : any) => {
        localStorage.setItem(Global.AUTH_KEY, response.token);
        return response;
      }
    })
  })
});

export const {
  useLoginMutation,
} = sessionApi;