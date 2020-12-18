import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Paper } from '@material-ui/core';
import { PagingState, CustomPaging, SelectionState } from '@devexpress/dx-react-grid';
import { connect, useSelector } from 'react-redux';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableSelection,
} from '@devexpress/dx-react-grid-material-ui';

import { UsersListActions } from '../../components/users-list-actions/users-list-actions';
import { getUsersDataAction } from '../../actions/async';
import { bookMarkedUsersSelector, usersListSelector } from '../../selectors';
import { UsersListOptionTypes } from '../../types';
import { setBookmarkedUsersAction } from '../../actions/sync';
import { UserListItemTypes } from '../../selectors/types';
import { unstable_batchedUpdates } from 'react-dom';
import { StyledConfirmDialog } from '../../shared/styled-confirm-dialog/styled-confirm-dialog';
import { StyledLoader } from '../../shared/styled-loader/styled-loader';

const columns = [
  { name: 'email', title: 'Email' },
  { name: 'fullName', title: 'Full name' },
  { name: 'location', title: 'Location' },
  { name: 'gender', title: 'Gender' },
  { name: 'city', title: 'City' },
  { name: 'address', title: 'Address' },
  { name: 'avatar', title: 'Photo' },
];

type UsersListCompPropTypes = {
  getUsers(options: UsersListOptionTypes): void;
  setBookmarkedUsers(users: { [key: string]: UserListItemTypes }): void;
};

export const UsersListComp: FC<UsersListCompPropTypes> = ({ getUsers, setBookmarkedUsers }) => {
  const [options, setOptions] = useState<UsersListOptionTypes>({
    page: 1,
    gender: '',
    limit: 50,
  });
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Array<number | string>>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

  const users = useSelector(usersListSelector);
  const bookMarkedUsers = useSelector(bookMarkedUsersSelector);

  const finalUsers = useMemo(() => Object.values(users), [users]);
  const genderChangeHandler = useCallback((e) => {
    setOptions((options) => ({
      ...options,
      gender: e.target.value,
    }));
  }, []);

  const pageChangeHandler = useCallback((page) => {
    setOptions((options) => ({ ...options, page }));
  }, []);

  const pageSizeChangeHandler = useCallback((limit) => {
    setOptions((options) => ({ ...options, limit }));
  }, []);

  const setBookMarks = useCallback(() => {
    setOpenConfirmDialog(false);
    const bookMarkedUsers = selectedIds.reduce<{ [key: string]: UserListItemTypes }>(
      (acc, curr) => {
        acc[curr] = users[curr];
        return acc;
      },
      {}
    );
    unstable_batchedUpdates(() => {
      setBookmarkedUsers(bookMarkedUsers);
    });
  }, [setBookmarkedUsers, selectedIds, users]);

  const selectChangeHandler = useCallback((ids: Array<number | string>) => {
    setSelectedIds(ids);
    setOpenConfirmDialog(true);
  }, []);

  const bookMarksChangeHandler = useCallback((e) => {
    setIsBookmarked(e.target.checked);
  }, []);

  const confirmCancelHandler = useCallback(() => {
    setSelectedIds(selectedIds.slice(0, selectedIds.length - 1));
    setOpenConfirmDialog(false);
  }, [selectedIds]);

  const finalBookmarkedUsers = useMemo(
    () =>
      options.gender
        ? Object.values(bookMarkedUsers).filter((user) => user.gender === options.gender)
        : Object.values(bookMarkedUsers),
    [options.gender, bookMarkedUsers]
  );

  useEffect(() => {
    if (!isBookmarked) {
      getUsers(options);
    }
  }, [options, getUsers, isBookmarked]);

  useEffect(() => {
    unstable_batchedUpdates(() => {
      setBookmarkedUsers({});
      setSelectedIds([]);
    });
  }, [users, setBookmarkedUsers]);

  return (
    <Paper>
      <UsersListActions
        onGenderChange={genderChangeHandler}
        onBookmarksChange={bookMarksChangeHandler}
        genderFilter={options.gender}
        isBookmarked={isBookmarked}
      />
      <Grid
        rows={isBookmarked ? finalBookmarkedUsers : finalUsers}
        columns={columns}
        getRowId={(row) => row.id}
      >
        <SelectionState selection={selectedIds} onSelectionChange={selectChangeHandler} />
        <PagingState
          defaultCurrentPage={0}
          defaultPageSize={50}
          onCurrentPageChange={pageChangeHandler}
          onPageSizeChange={pageSizeChangeHandler}
        />
        <CustomPaging totalCount={isBookmarked ? finalBookmarkedUsers.length : 1500} />
        <Table />
        <TableHeaderRow />
        <TableSelection />
        <PagingPanel pageSizes={[50, 100, 150, 0]} />
      </Grid>
      <StyledConfirmDialog
        open={openConfirmDialog}
        description="Are you sure you want to add to bookmarks?"
        onConfirm={setBookMarks}
        onClose={confirmCancelHandler}
      />
      <StyledLoader open={!finalUsers.length} />
    </Paper>
  );
};

const mapDispatch = (dispatch) => ({
  getUsers: (options: UsersListOptionTypes) => dispatch(getUsersDataAction(options)),
  setBookmarkedUsers: (data: { [key: string]: UserListItemTypes }) =>
    dispatch(setBookmarkedUsersAction(data)),
});

export const UsersList = connect(null, mapDispatch)(UsersListComp);
