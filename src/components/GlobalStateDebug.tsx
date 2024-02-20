import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const StateButton = styled.div`
  position: absolute;
  left: 33%;
  bottom: 0%;
  z-index: 1;
`;

function PaperComponent(props: any): JSX.Element {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

interface Props {
  state: any;
}

export const GlobalStateDebug = ({ state }: Props): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <StateButton>
        <Button variant="outlined" size="small">
          <div onClick={handleClickOpen}>debug state</div>
        </Button>
      </StateButton>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Global State
        </DialogTitle>
        <DialogContent>
          {open ? (
            <div>
              <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};
