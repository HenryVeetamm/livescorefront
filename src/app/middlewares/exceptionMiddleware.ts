import { isRejectedWithValue, Middleware, isRejected } from '@reduxjs/toolkit';

export const exceptionsMiddleware: Middleware = () => (next) => (action) => {

  if (isRejectedWithValue(action)) {
    console.warn(action, 'REJECTED');
  }else if (isRejected(action)) {
    console.warn(action, 'REJECTED@');
  }

  return next(action);
};