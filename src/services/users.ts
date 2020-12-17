import { Api } from './api';
import { UserResponseModel } from '../models';

class UserService {
  getUserProfile = async (): Promise<[UserResponseModel | null, Error | null]> => {
    try {
      const { results } = await Api.get<{ results: UserResponseModel[] }>('/?results=1');
      return [results[0], null];
    } catch (err) {
      return [null, err];
    }
  };
}

export default new UserService();
