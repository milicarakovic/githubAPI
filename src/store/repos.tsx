import { Dispatch } from 'redux';
import { Repo } from '../models/Repo';
import { GetRateLimit, GetReposForUser } from '../service/api';
import { errorActions } from './error';
import { limitActions } from './limit';

type ReposActions = { type: 'SET_REPOS'; data: Repo[] };
interface ReposState {
  repos: Repo[];
}

const initialRepoState: ReposState = {
  repos: [],
};

export const reposReducer = (
  state: ReposState = initialRepoState,
  action: ReposActions
) => {
  switch (action.type) {
    case 'SET_REPOS':
      return { repos: [...action.data] };
    default:
      return state;
  }
};

const setReposAction = (repos: Repo[] | null) => {
  return {
    type: 'SET_REPOS',
    data: repos,
  };
};

const getReposAsyncAction =
  (username: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      const { coreLimit } = getState();
      if (coreLimit === undefined || coreLimit > 0) {
        const repos: Repo[] | null = await GetReposForUser(username);

        dispatch(setReposAction(repos));
        const limit = await GetRateLimit();
        dispatch(limitActions.setLimitAction(limit));
      } else {
        dispatch(
          errorActions.setErrorAction(
            `You've reached the limit for fetching user.`
          )
        );
      }
    } catch (e) {
      dispatch(errorActions.setErrorAction(e.message));
    }
  };

export const reposAction = {
  getReposAsyncAction,
};
