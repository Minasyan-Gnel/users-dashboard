import { Reducer } from 'redux';

import { SET_USER_DATA, UPDATE_USER_DATA } from '../actions/types';
import { UserModel } from '../models';

type UsersReducerStateType = {
  currentUser?: UserModel;
  users: Array<UserModel> | [];
};

const initialState = {
  users: [],
};

export const UsersReducer: Reducer<UsersReducerStateType> = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
