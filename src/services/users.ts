import { Api } from './api';
import { UserResponseModel } from '../models';
import { UsersListOptionTypes } from '../types';

class UserService {
  getUserProfile = async (): Promise<[UserResponseModel | null, Error | null]> => {
    try {
      const { results } = await Api.get<{ results: UserResponseModel[] }>('/?results=1');
      return [results[0], null];
    } catch (err) {
      return [null, err];
    }
  };

  getUsersList = async ({
    gender,
    limit,
    page,
  }: UsersListOptionTypes): Promise<[UserResponseModel[] | null, Error | null]> => {
    try {
      const { results } = await Api.get<{ results: UserResponseModel[] }>(
        `/?results=${limit}&page=${page}&gender=${gender}&seed=abc`
      );
      return [results, null];
    } catch (err) {
      return [null, err];
    }
  };
}

export default new UserService();
