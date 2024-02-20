import { Link, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DetailsIcon from '@material-ui/icons/Details';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import Logo from './components/Logo';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  icon: {
    transform: 'rotate(-90deg)',
  },
});

const MyListIcon = (): JSX.Element => <DetailsIcon style={{ transform: 'rotate(-90deg)' }} />;

const routes = [
  {
    index: 1,
    link: '/models',
    icon: <MyListIcon />,
    text: 'Polygonal Models',
  },
  {
    index: 2,
    link: '/transformations',
    icon: <MyListIcon />,
    text: 'Transformations',
  },
  {
    index: 3,
    link: '/illumination',
    icon: <MyListIcon />,
    text: 'Illumination',
  },
  {
    index: 4,
    link: '/texturing',
    icon: <MyListIcon />,
    text: 'Texturing',
  },
  {
    index: 5,
    link: '/pbr',
    icon: <MyListIcon />,
    text: 'Physical Based Randering',
  },
  {
    index: 6,
    link: '/ao',
    icon: <MyListIcon />,
    text: 'Ambient Occlusion',
  },
];

export default function TemporaryDrawer(): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState(false);

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent): void => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(!state);
  };

  const sideList = (): JSX.Element => (
    <div className={classes.list} role="presentation" onClick={toggleDrawer()} onKeyDown={toggleDrawer()}>
      <div style={{ padding: '1em', width: '120px' }}>
        <Link underline="none" target="_blank" href="https://3d.if.uzh.ch">
          <Logo />
        </Link>
      </div>

      <List>
        {routes.map((item, index) => (
          <div key={index}>
            <NavLink to={item.link}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
            <Divider />
          </div>
        ))}
      </List>
      <div style={{ fontSize: '0.8em', position: 'fixed', bottom: '1em', left: '1em' }}>
        <Typography component="span" style={{ display: 'inline' }}>
          by ©
        </Typography>{' '}
        <Link color="inherit" target="_blank" href="https://www.ifi.uzh.ch/en/vmml.html">
          <Typography component="span">VMML</Typography>
        </Link>
        {' / '}
        <Link color="inherit" target="_blank" href="https://github.com/nikzaugg">
          <Typography component="span">Nik Zaugg</Typography>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <Button style={{ position: 'absolute', bottom: '1em', right: '50%', zIndex: 2 }} onClick={toggleDrawer()}>
        <MenuRoundedIcon fontSize="large" />
      </Button>
      <Drawer open={state} onClose={toggleDrawer()}>
        {sideList()}
      </Drawer>
    </div>
  );
}
