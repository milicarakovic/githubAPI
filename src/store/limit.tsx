import { Dispatch } from 'redux';
import { Limit } from '../models/Limit';
import { GetRateLimit } from '../service/api';
import { errorActions } from './error';

const initialLimitState = new Limit(-1, -1, -1);

type LimitActions = { type: 'SET_LIMIT'; data: Limit };

export const limitReducer = (
  state = initialLimitState,
  action: LimitActions
) => {
  switch (action.type) {
    case 'SET_LIMIT':
      return action.data;
    default:
      return state;
  }
};

const setLimitAction = (limit: Limit | null) => {
  return {
    type: 'SET_LIMIT',
    data: limit,
  };
};

const getLimitAsyncAction = () => async (dispatch: Dispatch, getState: any) => {
  try {
    const limit: Limit | null = await GetRateLimit();
    dispatch(setLimitAction(limit));
    if (limit?.remaining === 0) {
      dispatch(errorActions.setErrorAction(`You've reached the limit.`));
    }
  } catch (e) {
    dispatch(errorActions.setErrorAction(e.message));
  }
};

export const limitActions = {
  getLimitAsyncAction,
  setLimitAction,
};
