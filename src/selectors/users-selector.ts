import { createSelector } from 'reselect';
import { UserEditModel, UserModel } from '../models';
import { RootReducerStateTypes } from '../reducers';
import { UserListItemTypes, UserProfileTypes } from './types';

export const userInfoSelector = createSelector<
  RootReducerStateTypes,
  UserModel | undefined,
  UserProfileTypes
>(
  (state) => state.usersData.currentUser,
  (currUser) => {
    if (currUser) {
      return {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        gender: currUser.gender,
        avatar: currUser.avatar,
      };
    }
    return {};
  }
);

export const userEditSelector = createSelector<
  RootReducerStateTypes,
  UserModel | undefined,
  UserEditModel | undefined
>(
  (state) => state.usersData.currentUser,
  (currUser) => {
    if (currUser) {
      return {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        address: currUser.address,
        city: currUser.city,
        postcode: currUser.postcode,
        emails: currUser.emails,
        phones: currUser.phones,
      };
    }
  }
);

export const usersListSelector = createSelector<
  RootReducerStateTypes,
  { [key: string]: UserModel },
  { [key: string]: UserListItemTypes }
>(
  (state) => state.usersData.users,
  (users) =>
    Object.keys(users).reduce((acc, curr) => {
      acc[curr] = {
        id: users[curr].id,
        gender: users[curr].gender,
        avatar: users[curr].avatar,
        fullName: users[curr].fullName,
        address: users[curr].address,
        city: users[curr].city,
        location: JSON.stringify(users[curr].location),
        email: users[curr].emails[0],
      };
      return acc;
    }, {})
);

export const bookMarkedUsersSelector = createSelector<
  RootReducerStateTypes,
  { [key: string]: UserListItemTypes },
  { [key: string]: UserListItemTypes }
>(
  (state) => state.usersData.bookmarkUsers,
  (bookMarkedUsers) => bookMarkedUsers
);
