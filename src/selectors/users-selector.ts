import { createSelector } from 'reselect';
import { UserEditDataModel, UserModel } from '../models';
import { RootReducerStateTypes } from '../reducers';

type UserProfileTypes = {
  firstName?: string;
  lastName?: string;
  gender?: string;
  avatar?: string;
};

export const userInfo = createSelector<
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

export const userDataForEdit = createSelector<
  RootReducerStateTypes,
  UserModel | undefined,
  UserEditDataModel | undefined
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
