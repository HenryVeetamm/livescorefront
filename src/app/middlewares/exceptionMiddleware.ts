import { isRejectedWithValue, Middleware, isRejected } from '@reduxjs/toolkit';

export const exceptionsMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn(action.payload);
  }else if (isRejected(action)) {
    console.warn(action.error);
  }

  return next(action);
};