import { combineReducers } from 'redux';
import { UsersReducer } from './users-reducer';

export const rootReducer = combineReducers({
  usersData: UsersReducer,
});

export type RootReducerStateTypes = ReturnType<typeof rootReducer>;
