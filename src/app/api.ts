
import { getSession } from './utils/session';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const basePath = `${process.env.REACT_APP_API_URL}`;

export const getAuthorizationHeader = () => {
  const session = getSession();
  if (session) return `Bearer ${session}`;
  return null;
};

const baseQuery = (prefix?: string | null) => fetchBaseQuery({
  baseUrl: `${basePath}/${prefix || ''}`,
  prepareHeaders: (headers) => {
    const header = getAuthorizationHeader();
    if (header) headers.set('Authorization', header);
    return headers;
  },
});

const buildBaseQuery = (prefix?: string | null): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraoptions) => {


  return await baseQuery(prefix)(args,api, extraoptions);
};


export { buildBaseQuery };