import React, { FC } from 'react';
import { StyledSelect } from '../../shared/styled-select/styled-select';
import CheckBox from '@material-ui/core/Checkbox';
import { css } from '@emotion/css';

type UsersListActionsProps = {
  onGenderChange(e: any): void;
  onBookmarksChange(e: any): void;
  genderFilter: string;
  isBookmarked: boolean;
};

export const UsersListActions: FC<UsersListActionsProps> = ({
  onGenderChange,
  onBookmarksChange,
  genderFilter,
  isBookmarked,
}) => (
  <div className={actionsContainerStyles}>
    <div className={selectContainerStyles}>
      <div className={bookmarkStyles}>
        <span>Bookmarks</span>
        <CheckBox color="primary" onChange={onBookmarksChange} checked={isBookmarked} />
      </div>
      <StyledSelect
        label="Filter by gender"
        onChange={onGenderChange}
        value={genderFilter}
        items={[
          { label: 'All', value: '' },
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
      />
    </div>
  </div>
);

const actionsContainerStyles = css`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 10px;
  padding: 5px 10px;
  border-bottom: 1px solid black;
`;

const selectContainerStyles = css`
  width: 300px;
  display: flex;
`;

const bookmarkStyles = css`
  width: 220px;
`;
