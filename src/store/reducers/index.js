import { combineReducers } from 'redux';
import { appReducer } from './appReducer'
import { postReducer } from './postReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  posts: postReducer,
  users: userReducer
});
