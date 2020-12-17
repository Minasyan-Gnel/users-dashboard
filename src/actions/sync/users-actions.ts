import { createAction } from '../../factories/action-creator-factory';
import { UserEditDataModel, UserResponseModel } from '../../models';
import { SET_USER_DATA, UPDATE_USER_DATA } from '../types';
import { ActionType } from '../../types';

export const updateUserDataAction = (data: UserEditDataModel): ActionType<UserEditDataModel> =>
  createAction<UserEditDataModel>(UPDATE_USER_DATA, data);

export const setUserDataAction = (data: UserResponseModel): ActionType<UserResponseModel> =>
  createAction<UserResponseModel>(SET_USER_DATA, data);
