import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/css';

import { RouterEnum } from '../../types/enums';

export const NavigationBar: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className={navContainerStyles}>
      <Link
        to={RouterEnum.PROFILE}
        className={`${linkStyles} ${pathname === RouterEnum.PROFILE ? linkActiveStyles : ''}`}
      >
        User profile
      </Link>
      <Link
        to={RouterEnum.DASHBOARD}
        className={`${linkStyles} ${pathname === RouterEnum.DASHBOARD ? linkActiveStyles : ''}`}
      >
        Dashboard
      </Link>
      <Link
        to={RouterEnum.USERS_LIST}
        className={`${linkStyles} ${pathname === RouterEnum.USERS_LIST ? linkActiveStyles : ''}`}
      >
        Users list
      </Link>
    </div>
  );
};

const navContainerStyles = css`
  box-shadow: 0 4px 2px -2px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 5px;
`;

const linkStyles = css`
  display: inline-block;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #53beee;
  color: black;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #007d9e;
  }
  &:active {
    box-shadow: inset 0px 0px 10px 2px black;
  }
`;

const linkActiveStyles = css`
  color: #ffffff;
  background-color: rgb(220, 0, 78);
`;
