import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

type StyledConfirmDialogPropTypes = {
  open?: boolean;
  onClose?(): void;
  onConfirm?(): void;
  cancelBtnText?: string;
  confirmBtnText?: string;
  description?: string;
  title?: string;
};

export const StyledConfirmDialog: FC<StyledConfirmDialogPropTypes> = ({
  open = false,
  onClose,
  title = 'Confirm',
  onConfirm,
  cancelBtnText = 'Cancel',
  confirmBtnText = 'Confirm',
  description,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="draggable-dialog-title">
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {title}
      </DialogTitle>
      {description ? (
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
      ) : null}
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          {cancelBtnText}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
