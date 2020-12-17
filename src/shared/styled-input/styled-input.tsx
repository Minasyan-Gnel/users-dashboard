import React, { FC } from 'react';
import { makeStyles, TextField } from '@material-ui/core';

type StyledInputPropTypes = {
  label: string;
  value: string;
};

export const StyledInput: FC<StyledInputPropTypes> = ({ label, value, ...props }) => {
  const inputClasses = useInputStyles();

  return (
    <TextField
      classes={inputClasses}
      label={label}
      InputLabelProps={{ shrink: !!value }}
      value={value}
      variant="outlined"
      size="small"
      {...props}
    />
  );
};

const useInputStyles = makeStyles({
  root: {
    width: '100%',
    margin: '0 10px',
    '&:first-child': {
      'margin-left': 0,
    },
    '&:last-child': {
      'margin-right': 0,
    },
  },
});
