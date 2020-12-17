import React, { FC } from 'react';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';

import { userInfo } from '../../selectors';

export const UserAvatarWrapper: FC = () => {
  const { firstName = 'Full', lastName = 'name', gender = 'gender', avatar } = useSelector(
    userInfo
  );

  return (
    <div className={avatarContainer}>
      <div className={avatarWrapper}>
        <img alt="avatar" src={avatar} />
        <p>{`${firstName} ${lastName}`}</p>
        <p>{gender}</p>
      </div>
    </div>
  );
};

const avatarContainer = css`
  width: 300px;
  font-family: Roboto;
`;

const avatarWrapper = css`
  padding: 15px 10px;
  border: 2px solid #dfdbdb;
  border-radius: 3px;
  > img {
    height: 80px;
    border-radius: 100%;
  }
  > p {
    margin-left: 3px;
    font-family: Roboto;
  }
`;
