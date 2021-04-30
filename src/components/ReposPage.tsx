import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import forkIcon from '../components/fork-git.png';
import { Repo } from '../models/Repo';
import { User } from '../models/User';
import { reposAction } from '../store/repos';
import { usersActions } from '../store/users';

interface ParamTypes {
  username: string;
}

function ReposPage() {
  const { username } = useParams<ParamTypes>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const repos: Repo[] = useSelector((state: any) => state.repos);
  const user: User = useSelector((state: any) => state.users?.currentUser);

  useEffect(() => {
    dispatch(usersActions.getUserAsyncAction(username));
    dispatch(reposAction.getReposAsyncAction(username));
  }, []);

  return (
    <Grid container className={classes.containerGrid}>
      {user && user.id ? (
        <Grid item xs={12} className={classes.mainCardGrid}>
          <Card key={user.id} className={classes.mainCard} variant="outlined">
            <CardMedia
              className={classes.mainCardMedia}
              image={user.avatar_url}
              title="Github"
            />
            <div className={classes.cardDetails}>
              <CardContent style={{ padding: 5 }}>
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
                  style={{ color: '#F5F5F5', fontStyle: 'italic' }}
                >
                  {user.bio ? (
                    <TextTruncate
                      line={3}
                      element="span"
                      truncateText="…"
                      text={user.bio}
                    />
                  ) : (
                    <label>There is no available bio for this user.</label>
                  )}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      ) : null}
      {repos && repos.length > 0
        ? repos
            .sort(
              (a: Repo, b: Repo) =>
                +new Date(b.created_at) - +new Date(a.created_at)
            )
            .map((repo: Repo) => {
              return (
                <Grid item xs={6} key={repo.id} className={classes.cardGrid}>
                  <Card className={classes.card}>
                    <CardActionArea
                      onClick={() => window.open(repo.html_url)}
                      style={{ display: 'flex' }}
                    >
                      <Grid item xs={2} className={classes.cardLeftGrid}>
                        <Grid
                          item
                          xs={12}
                          className={classes.cardLeftDetail}
                          style={{ color: 'yellow' }}
                        >
                          <StarBorderIcon />
                          {repo.stargazers_count}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          className={classes.cardLeftDetail}
                          style={{ color: '#bb86fc' }}
                        >
                          <VisibilityIcon />
                          {repo.watchers_count}
                        </Grid>
                        <Grid item xs={12} className={classes.cardLeftDetail}>
                          <img
                            alt={'fork'}
                            src={forkIcon}
                            style={{ height: 20, paddingLeft: 3 }}
                          />
                          {repo.forks_count}
                        </Grid>
                      </Grid>
                      <div className={classes.verticalLine} />
                      <Grid item xs={8} className={classes.cardLeftGrid}>
                        <CardContent className={classes.cardDetails}>
                          <Typography
                            variant="body2"
                            // color="textSecondary"
                            component="p"
                            className={classes.cardName}
                          >
                            {repo.name}
                          </Typography>
                          <div className={classes.cardDescription}>
                            {repo.description ? (
                              <TextTruncate
                                line={3}
                                element="span"
                                truncateText="…"
                                text={repo.description}
                              />
                            ) : (
                              <label
                                style={{ fontStyle: 'italic', color: 'grey' }}
                              >
                                There is no available description for this repo.
                              </label>
                            )}
                          </div>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.cardDate}
                          >
                            Created at:{' '}
                            {moment(repo.created_at).format('DD-MM-YYYY')}
                          </Typography>
                        </CardContent>
                      </Grid>
                      <div className={classes.verticalLine} />
                      <Grid item xs={2} className={classes.cardLeftGrid}>
                        <Grid
                          item
                          xs={12}
                          className={classes.cardLeftDetail}
                          style={{ color: 'grey', fontStyle: 'bold' }}
                        >
                          License
                        </Grid>
                        <Grid item xs={12} className={classes.cardLeftDetail}>
                          {repo.license &&
                          repo.license.name &&
                          repo.license.name !== 'null' ? (
                            <label className={classes.noInfo}>
                              {repo.license.name}
                            </label>
                          ) : (
                            <label
                              className={classes.noInfo}
                              style={{ color: 'grey' }}
                            >
                              Does not exist
                            </label>
                          )}
                        </Grid>
                      </Grid>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })
        : repos && (
            <Grid item xs={12} className={classes.itemGrid}>
              <label className={classes.alert}>
                There are no repositories available for this user.
              </label>
            </Grid>
          )}
    </Grid>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    mainCardGrid: {
      display: 'flex',
      justifyContent: 'center',
    },
    mainCard: {
      padding: 2,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#3700b3',
      border: 'solid #3700b3',
      marginBottom: '3%',
      marginTop: '3%',
      display: 'flex',
      backgroundColor: 'rgb(55,0,179, 0.5)',
      width: '40%',
      height: 115,
    },
    mainCardMedia: {
      width: 210,
      height: 110,
      borderRadius: 10,
      margin: 2,
    },
    alert: {
      color: '#cf6679',
      textAlign: 'center',
      fontSize: '15px',
    },
    noInfo: {
      color: 'white',
      textAlign: 'center',
      fontSize: '15px',
      fontStyle: 'italic',
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
      borderRadius: 2,
      borderWidth: 2,
      borderColor: '#3700b3',
      border: 'solid #3700b3',
      marginBottom: '5%',
      display: 'flex',
      backgroundColor: 'rgb(55,0,179, 0.5)',
      height: '90%',
      width: '95%',
      '&:hover': {
        background: 'rgb(55,0,179, 1)',
      },
    },
    cardDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      paddingBottom: 0,
    },
    cardName: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'black',
      margin: '2%',
    },
    cardDescription: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 15,
      color: 'white',
      height: 45,
    },
    cardDate: {
      paddingTop: 20,
      fontSize: 15,
      color: 'white',
      height: 35,
      display: 'flex',
      alignItems: 'center',
    },
    cardLink: {
      fontSize: 12,
      color: 'white',
      height: 25,
    },
    cardLeftGrid: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
    },
    verticalLine: {
      borderLeft: '1px solid black',
      height: '90%',
      alignSelf: 'center',
    },
    cardLeftDetail: {
      height: 30,
      width: '50%',
      display: 'flex',
      marginTop: '10%',
      alignContent: 'center',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  })
);
export default ReposPage;
