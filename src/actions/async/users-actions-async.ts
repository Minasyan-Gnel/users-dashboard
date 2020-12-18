import { Dispatch } from 'redux';
import UsersService from '../../services/users';
import { setUserDataAction, setUsersListAction, setDashboardUsersListAction } from '../sync';
import { UsersListOptionTypes } from '../../types';

export const getUserDataAction = () => async (dispatch: Dispatch): Promise<void> => {
  const [userData] = await UsersService.getUserProfile();

  if (userData) {
    dispatch(setUserDataAction(userData));
  }
};

export const getUsersDataAction = (options: UsersListOptionTypes) => async (
  dispatch: Dispatch
): Promise<void> => {
  const [usersList] = await UsersService.getUsersList(options);

  if (usersList) {
    dispatch(setUsersListAction(usersList));
  }
};

export const getDashboardUsersDataAction = () => async (dispatch: Dispatch): Promise<void> => {
  const [usersList] = await UsersService.getUsersList({ limit: 2000, gender: '', page: 1 });

  if (usersList) {
    dispatch(setDashboardUsersListAction(usersList));
  }
};
