import { Reducer } from 'redux';

import {
  SET_BOOKMARKED_USERS,
  SET_DASHBOARD_USERS_DATA,
  SET_USER_DATA,
  SET_USERS_DATA,
  UPDATE_USER_DATA,
} from '../actions/types';
import { UserModel } from '../models';
import { UserListItemTypes } from '../selectors/types';

type UsersReducerStateType = {
  currentUser?: UserModel;
  users: {
    [key: string]: UserModel;
  };
  bookmarkUsers: {
    [key: string]: UserListItemTypes;
  };
  dashboardUsers: {
    [key: string]: number;
  };
};

const initialState = {
  users: {},
  bookmarkUsers: {},
  dashboardUsers: {},
};

export const UsersReducer: Reducer<UsersReducerStateType> = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_USERS_DATA:
      return {
        ...state,
        users: action.payload,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case SET_BOOKMARKED_USERS:
      return {
        ...state,
        bookmarkUsers: action.payload,
      };
    case SET_DASHBOARD_USERS_DATA:
      return {
        ...state,
        dashboardUsers: action.payload,
      };
    default:
      return state;
  }
};
