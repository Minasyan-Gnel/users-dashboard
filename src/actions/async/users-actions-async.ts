import { Dispatch } from 'redux';
import UsersService from '../../services/users';
import { setUserDataAction } from '../sync';

export const getUserDataAction = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    const [userData] = await UsersService.getUserProfile();

    if (userData) {
      dispatch(setUserDataAction(userData));
    }
  };
};
