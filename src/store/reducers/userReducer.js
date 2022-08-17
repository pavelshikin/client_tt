import { userTypes } from '../types';

const initialState = {
  users: [],
  error: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.FETCH_ALL_USERS_ERROR ||
    userTypes.FETCH_USER_ERROR ||
    userTypes.DELETE_USER_ERROR ||
    userTypes.CREATE_USER_ERROR:
      return {
        ...state, error: action.payload
      };
    case userTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state, error: '',
        users: action.payload
      };
    case userTypes.CREATE_USER_SUCCESS:
      return {
        ...state, error: '',
        users: [...state.users, action.payload],
      };
    case userTypes.DELETE_USER_SUCCESS:
      return {
        error: '',
          posts: state.users.filter(user => user._id !== action.payload)
      };
    default:
      return state;
  }
};
