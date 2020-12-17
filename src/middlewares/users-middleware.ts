import { Middleware } from 'redux';
import { SET_USER_DATA } from '../actions/types';
import { UserResponseModel, UserModel } from '../models';

const convertUserData = (data: UserResponseModel): UserModel => {
  const { name, location, email, phone, picture, gender } = data;
  return {
    gender,
    avatar: picture.medium,
    fullName: `${name.first} ${name.last}`,
    firstName: name.first,
    lastName: name.last,
    address: `${location.street.name} ${location.street.number}`,
    city: location.city,
    postcode: location.postcode,
    phones: [phone],
    emails: [email],
  };
};

export const UsersMiddleware: Middleware = () => (next) => (action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      const { payload } = action;
      next({
        ...action,
        payload: convertUserData(payload),
      });
      break;
    }
    default:
      next(action);
  }
};
