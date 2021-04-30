import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.wholePage}>
      <div className={classes.code}>
        <h6>404 page not found</h6>
      </div>
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    wholePage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#121212',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    code: {
      fontSize: '50px',
      color: 'white',
      width: ' 100%',
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export default NotFound;
