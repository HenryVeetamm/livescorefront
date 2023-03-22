import { Middleware } from '@reduxjs/toolkit';

export const unauthMiddleware : Middleware = () => (next) => (action) => {
  return next(action);
};