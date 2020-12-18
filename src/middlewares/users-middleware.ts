import { Middleware } from 'redux';
import { SET_DASHBOARD_USERS_DATA, SET_USER_DATA, SET_USERS_DATA } from '../actions/types';
import { UserResponseModel, UserModel } from '../models';

const convertUserData = (data: UserResponseModel): UserModel => {
  const { name, location, email, phone, picture, gender } = data;
  return {
    gender,
    location,
    id: email,
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

const calculateDashboardData = (data: UserResponseModel[]) => {
  return data.reduce((acc, curr) => {
    const date = new Date(curr.registered.date);
    const month = date.getMonth() + 1;

    acc[month] = acc[month] + 1 || 1;

    return acc;
  }, {});
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
    case SET_USERS_DATA: {
      const { payload } = action;
      next({
        ...action,
        payload: payload.reduce((acc, curr: UserResponseModel) => {
          acc[curr.email] = convertUserData(curr);
          return acc;
        }, {}),
      });
      break;
    }
    case SET_DASHBOARD_USERS_DATA: {
      const { payload } = action;
      next({
        ...action,
        payload: calculateDashboardData(payload),
      });
      break;
    }
    default:
      next(action);
  }
};
