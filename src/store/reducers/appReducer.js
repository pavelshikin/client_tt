import { appTypes } from '../types';

const initialState = {
  loading: false,
  error: ''
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appTypes.SHOW_LOADER:
      return { ...state, loading: true };
    case appTypes.HIDE_LOADER:
      return { ...state, loading: false };
    case appTypes.SHOW_ERROR:
      return { ...state, error: action.payload };
    case appTypes.HIDE_ERROR:
      return { ...state, error: '' };
    default:
      return state;
  }
};
