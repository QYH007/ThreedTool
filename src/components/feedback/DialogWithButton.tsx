import { Button, Dialog } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface Props {
  children: React.ReactNode;
  buttonTitle: string;
}

export default function DialogWithButton({ children, buttonTitle }: Props): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        {buttonTitle}
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <div className={classes.paper}>{children}</div>
      </Dialog>
    </>
  );
}
