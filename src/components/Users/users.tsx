import React, { FC } from 'react';

type UsersPropTypes = {
  name: string;
};

export const Users: FC<UsersPropTypes> = ({ name }) => {
  return <div>{name}</div>;
};
