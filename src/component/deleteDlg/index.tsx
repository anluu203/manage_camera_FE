import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface PropDialog{
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    tittle:string;
    description:string;
}
export default function DialogDelete({open, onClose, onConfirm, tittle, description}: PropDialog) {



  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          {tittle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}