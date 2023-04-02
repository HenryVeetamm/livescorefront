import { isRejectedWithValue, Middleware, isRejected } from '@reduxjs/toolkit';
import { showError } from 'utils/messages';

export const exceptionsMiddleware: Middleware = () => (next) => (action) => {
  const { payload } = action;
  if (isRejectedWithValue(action)) {
    if (payload && payload.data) showError(payload.data.Exception);
  }else if (isRejected(action)) {
    if (payload && payload.data) showError(payload.data.Exception);
  }

  return next(action);
};