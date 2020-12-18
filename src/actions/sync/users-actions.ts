import { createAction } from '../../factories/action-creator-factory';
import { UserEditModel, UserResponseModel } from '../../models';
import {
  SET_USER_DATA,
  SET_USERS_DATA,
  UPDATE_USER_DATA,
  SET_BOOKMARKED_USERS,
  SET_DASHBOARD_USERS_DATA,
} from '../types';
import { ActionType } from '../../types';
import { UserListItemTypes } from '../../selectors/types';

export const updateUserDataAction = (data: UserEditModel): ActionType<UserEditModel> =>
  createAction<UserEditModel>(UPDATE_USER_DATA, data);

export const setUserDataAction = (data: UserResponseModel): ActionType<UserResponseModel> =>
  createAction<UserResponseModel>(SET_USER_DATA, data);

export const setUsersListAction = (data: UserResponseModel[]): ActionType<UserResponseModel[]> =>
  createAction<UserResponseModel[]>(SET_USERS_DATA, data);

export const setDashboardUsersListAction = (
  data: UserResponseModel[]
): ActionType<UserResponseModel[]> =>
  createAction<UserResponseModel[]>(SET_DASHBOARD_USERS_DATA, data);

export const setBookmarkedUsersAction = (data: {
  [key: string]: UserListItemTypes;
}): ActionType<{ [key: string]: UserListItemTypes }> =>
  createAction<{ [key: string]: UserListItemTypes }>(SET_BOOKMARKED_USERS, data);
