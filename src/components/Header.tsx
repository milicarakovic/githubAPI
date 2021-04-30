import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.p}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          GitHub API
        </Typography>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => window.open('https://github.com/')}
          startIcon={<GitHubIcon />}
        >
          Open Github
        </Button>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    p: {
      backgroundColor: '#3700b3',
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default Header;
