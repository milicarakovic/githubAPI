import { createStyles, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import ReposPage from './components/ReposPage';
import { RootState } from './store';
import { errorActions } from './store/error';
import { limitActions } from './store/limit';

function App() {
  const styles = useStyles();
  const err: string = useSelector((state: RootState) => state.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(limitActions.getLimitAsyncAction());
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(errorActions.setErrorAction(''));
  };
  return (
    <div className={styles.page}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/:username/repos" component={ReposPage} />
          <Route exact component={NotFound} />
        </Switch>
      </Router>
      {err && (
        <Snackbar
          open={err !== undefined && err !== null && err !== ''}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} variant="filled" severity="error">
            {err}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    page: {
      backgroundColor: '#121212',
      minHeight: '100vh',
      color: '#FFFFF',
    },
  })
);
export default App;
