import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/css';

import { getUserDataAction } from '../../actions/async';
import { UserAvatarWrapper } from '../../components/user-avatar-wrapper/user-avatar-wrapper';
import { UserEditProfile } from '../../components/user-edit-profile/user-edit-profile';

type UserProfilePropTypes = {
  getUserInfo(): void;
};

const UserProfileComp: FC<UserProfilePropTypes> = ({ getUserInfo }) => {
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className={userProfileContainerStyles}>
      <UserAvatarWrapper />
      <UserEditProfile />
    </div>
  );
};

const mapDispatch = (dispatch) => ({
  getUserInfo: () => dispatch(getUserDataAction()),
});

export const UserProfile = connect(null, mapDispatch)(UserProfileComp);

const userProfileContainerStyles = css`
  height: calc(100vh - 45px);
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div {
    padding: 5px 10px 20px;
  }
`;
