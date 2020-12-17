import React, { FC } from 'react';
import { makeStyles, MenuItem, TextField } from '@material-ui/core';

type ItemTypes = {
  value: string;
  label: string;
};

type StyledSelectPropTypes = {
  label: string;
  items: ItemTypes[];
  value?: string;
};

export const StyledSelect: FC<StyledSelectPropTypes> = ({ label, value, items, ...props }) => {
  const inputClasses = useInputStyles();

  return (
    <TextField
      select
      classes={inputClasses}
      size="small"
      label={label}
      value={value}
      variant="outlined"
      {...props}
    >
      {items.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
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
