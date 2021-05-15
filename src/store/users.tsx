import { User } from '../models/User';
import { Dispatch } from 'redux';
import { GetRateLimit, GetUser, GetUsers } from '../service/api';
import { limitActions } from './limit';
import { errorActions } from './error';

interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialUserstate: UserState = {
  users: [],
  currentUser: null,
};

type usersActions =
  | { type: 'SET_USERS'; data: User[] }
  | { type: 'SET_USER'; data: User };

export const usersReducer = (
  state: UserState = initialUserstate,
  action: usersActions
) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: [...action.data],
      };
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.data,
      };
    default:
      return state;
  }
};

const setUsersAction = (users: User[] | null) => {
  return {
    type: 'SET_USERS',
    data: users,
  };
};

const setUserAction = (user: User | null) => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

const getUsersAsyncAction =
  (searchQuery: string | null) => async (dispatch: Dispatch, getState: any) => {
    if (searchQuery !== null && searchQuery !== '') {
      try {
        const { limit } = getState();
        if (limit && limit.remaining > 0) {
          const users = await GetUsers(searchQuery);

          // let newUsersArray: User[] = (
          //   await Promise.all(
          //     users.map(async (user) => {
          //       let detailedinfo = await GetUser(user.login);
          //       if (detailedinfo) {
          //         return new User(
          //           user.id,
          //           user.login,
          //           user.avatar_url,
          //           detailedinfo.bio
          //         );
          //       }
          //       return null;
          //     })
          //   )
          // ).filter((user) => user != null) as User[];
          // dispatch(setUsersAction(newUsersArray));

          dispatch(setUsersAction(users));

          const limit = await GetRateLimit();
          dispatch(limitActions.setLimitAction(limit));
        } else {
          dispatch(
            errorActions.setErrorAction(
              `You've reached the limit for getting users.`
            )
          );
        }
      } catch (e) {
        dispatch(errorActions.setErrorAction(e.message));
      }
    }
  };

const getUserAsyncAction =
  (searchQuery: string | null) => async (dispatch: Dispatch, getState: any) => {
    if (searchQuery !== null && searchQuery !== '') {
      try {
        const { coreLimit } = getState();
        if (coreLimit === undefined || coreLimit > 0) {
          const user: User | null = await GetUser(searchQuery);
          dispatch(setUserAction(user));
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
    }
  };

export const usersActions = {
  getUsersAsyncAction,
  getUserAsyncAction,
};
