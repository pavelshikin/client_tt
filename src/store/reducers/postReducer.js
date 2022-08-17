import {
  postTypes
} from '../types';

const initialState = {
  posts: [],
  error: '',
  postsByCategory: []
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.FETCH_POSTS_ERROR ||
    postTypes.FETCH_POSTS_BY_CATEGORY_ERROR ||
    postTypes.DELETE_POST_ERROR ||
    postTypes.UPDATE_POST_ERROR ||
    postTypes.CREATE_POST_CAT_ERROR ||
    postTypes.CREATE_POST_ERROR:
      return {
        ...state, error: action.payload
      };
    case postTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state, error: '', posts: action.payload
      };
    case postTypes.FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return {
        ...state, error: '', postsByCategory: action.payload
      };
    case postTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        error: '',
          posts: [...state.posts, action.payload],
          postsByCategory: [...state.postsByCategory, action.payload]
      };
    case postTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        error: '',
          posts: state.posts.map(post => {
            return post._id === action.payload._id ? action.payload : post;
          }),
          postsByCategory: state.postsByCategory.map(post => {
            return post._id === action.payload._id ? action.payload : post;
          })
      };
    case postTypes.CREATE_POST_CAT_SUCCESS:
      return {
        ...state,
        error: '',
          postsByCategory: [...state.postsByCategory, action.payload]
      };
    case postTypes.DELETE_POST_SUCCESS:
      return {
        error: '',
          posts: state.posts.filter(post => post._id !== action.payload),
          postsByCategory: state.postsByCategory.filter(
            post => post._id !== action.payload
          )
      };
    default:
      return state;
  }
};