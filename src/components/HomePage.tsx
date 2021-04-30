import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import { Limit } from '../models/Limit';
import { User } from '../models/User';
import { RootState } from '../store';
import { usersActions } from '../store/users';

function HomePage() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const dispatch = useDispatch();
  const users: User[] = useSelector((state: RootState) => state.users?.users);
  const limit: Limit = useSelector((state: RootState) => state.limit);

  const fetchUsers = () => {
    if (limit.remaining > 0) {
      dispatch(usersActions.getUsersAsyncAction(searchQuery));
    }
  };

  return (
    <Grid container className={classes.containerGrid}>
      <Grid item xs={12} className={classes.itemGrid}>
        <TextField
          id="outlined-basic"
          placeholder="Search"
          variant="outlined"
          classes={{ root: classes.root }}
          className={classes.textField}
          autoComplete="off"
          InputProps={{
            className: classes.input,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="outlined"
          className={classes.button}
          onClick={fetchUsers}
        >
          Search
        </Button>
        <div className={classes.remaining}>
          <label>
            Remaining: {limit.remaining} / {limit.limit}
          </label>
        </div>
      </Grid>
      <Grid container className={classes.containerGrid}>
        {users && users.length > 0
          ? users.map((user: User) => {
              return (
                <Grid item xs={5} key={user.id} className={classes.cardGrid}>
                  <Card
                    key={user.id}
                    className={classes.card}
                    variant="outlined"
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={user.avatar_url}
                      title="Github"
                    />
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography
                          variant="body2"
                          component="h2"
                          className={classes.cardName}
                        >
                          {user.login}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography
                          variant="body2"
                          component="p"
                          style={{ color: '#F5F5F5' }}
                        >
                          {user.bio ? (
                            <TextTruncate
                              line={2}
                              element="span"
                              truncateText="…"
                              text={user.bio}
                            />
                          ) : (
                            <TextTruncate
                              line={2}
                              element="span"
                              truncateText="…"
                              text="There is no available bio for this user."
                            />
                          )}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <Button
                          variant="contained"
                          className={classes.cardButton}
                          startIcon={<ArrowForwardIosIcon />}
                          component={Link}
                          to={`/${user.login}/repos`}
                        >
                          More
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </Grid>
              );
            })
          : users !== undefined && (
              <Grid item xs={12} className={classes.itemGrid}>
                <label className={classes.alert}>
                  There is no user with provided name.
                </label>
              </Grid>
            )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: 'white',
      width: '40%',
      '& .MuiFormLabel-root': {
        color: 'inherit',
      },
    },
    textField: {
      backgroundColor: 'inherit',
      border: 'solid #3700b3',
      borderRadius: '2px 0px 0px 2px',
    },
    input: {
      color: 'white',
      backgroundColor: '#121212',
    },
    button: {
      backgroundColor: '#3700b3',
      border: 'solid #3700b3',
      borderRadius: '0px 2px 2px 0px',
      color: 'white',
    },
    remaining: {
      color: '#3700b3',
      textAlign: 'center',
      marginLeft: '2%',
      fontSize: '15px',
      paddingTop: '16px',
    },
    alert: {
      color: '#cf6679',
      textAlign: 'center',
      fontSize: '15px',
    },
    containerGrid: {
      padding: '1%',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    itemGrid: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '2%',
      paddingBottom: '2%',
    },

    cardGrid: {
      maxHeight: 250,
    },
    card: {
      padding: 2,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#3700b3',
      border: 'solid #3700b3',
      marginBottom: '3%',
      display: 'flex',
      backgroundColor: 'rgb(55,0,179, 0.5)',
    },
    cardDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
    },
    cardMedia: {
      width: 200,
      height: 200,
      borderRadius: 10,
      margin: 2,
    },
    cardName: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white',
    },
    cardBio: {
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white',
    },
    cardButton: {
      backgroundColor: '#3700b3',
      border: 'solid #3700b3',
      borderRadius: '2px',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
    },
  })
);
export default HomePage;
