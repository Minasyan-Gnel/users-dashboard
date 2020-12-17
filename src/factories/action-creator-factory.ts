import { ActionType } from '../types';

export const createAction = <T>(type: string, payload: T): ActionType<T> => ({
  type,
  payload,
});
