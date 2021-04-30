import { combineReducers } from 'redux';
import { errorReducer } from './error';
import { limitReducer } from './limit';
import { reposReducer } from './repos';
import { usersReducer } from './users';

const allReducers = combineReducers({
  users: usersReducer,
  limit: limitReducer,
  repos: reposReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;
