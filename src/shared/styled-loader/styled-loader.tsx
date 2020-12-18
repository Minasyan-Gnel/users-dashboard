import React, { FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from '@emotion/styled';

type StyledLoaderPropTypes = {
  open?: boolean;
};

export const StyledLoader: FC<StyledLoaderPropTypes> = ({ open = false }) =>
  open ? (
    <LoaderStyled open={open}>
      <CircularProgress color="secondary" />
    </LoaderStyled>
  ) : null;

const LoaderStyled = styled('div')<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  background-color: rgba(114, 114, 114, 0.68);
  justify-content: center;
  align-items: center;
`;
