type errorActions = { type: 'SET_ERROR'; data: String };

export const errorReducer = (state = '', action: errorActions) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.data;
    default:
      return state;
  }
};

const setErrorAction = (message: string) => {
  return {
    type: 'SET_ERROR',
    data: message,
  };
};

export const errorActions = { setErrorAction };
