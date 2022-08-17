import api from '../../utilits/api';
import { postTypes } from '../types';
import { showLoader, hideLoader, showError } from './';

export const fetchPosts = () => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .get(`posts/me`)
      .then(res => {
        dispatch({
          type: postTypes.FETCH_POSTS_SUCCESS,
          payload: res.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: postTypes.FETCH_POSTS_ERROR,
          payload: 'Ошибка загрузки постов'
        });
        dispatch(showError('Ошибка загрузки постов'));
        console.log(error);
      });

    dispatch(hideLoader());
  };
};

export const fetchPostsByCategory = id => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .get(`posts/category/${id}`)
      .then(res => {
        dispatch({
          type: postTypes.FETCH_POSTS_BY_CATEGORY_SUCCESS,
          payload: res.data
        });
      })
      .catch(function(error) {
          dispatch({
            type: postTypes.FETCH_POSTS_BY_CATEGORY_ERROR,
            payload: 'Ошибка сервера'
          });
          console.log(error);
      });

    dispatch(hideLoader());
  };
};

export const createPost = post => {
  const { title, content, categoryId, categoryName } = post;

  return async dispatch => {
    dispatch(showLoader());

    await api
      .post(`posts`, { title, content, categoryId })
      .then(res => {
        const newPost = {
          _id: res.data._id,
          title,
          content,
          category: [
            {
              _id: categoryId,
              name: categoryName
            }
          ]
        };
        dispatch({
          type: postTypes.CREATE_POST_SUCCESS,
          payload: newPost
        });
      })
      .catch(function(error) {
        if (error.response.status === 403) {
          dispatch({
            type: postTypes.CREATE_POST_ERROR,
            payload: error.response.data.message || 'Ошибка сервера'
          });
        } else {
          dispatch({
            type: postTypes.CREATE_POST_ERROR,
            payload: 'Ошибка сервера'
          });
          console.log(error);
        }
      });

    dispatch(hideLoader());
  };
};

export const removePost = id => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .delete(`posts/${id}`)
      .then(res => {
        dispatch({
          type: postTypes.DELETE_POST_SUCCESS,
          payload: res.data
        });
      })
      .catch(function(error) {
          dispatch({
            type: postTypes.DELETE_POST_ERROR,
            payload: 'Ошибка'
          });
          console.log(error.response);
      });

    dispatch(hideLoader());
  };
};

export const updatePost = post => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .put(`posts`, post)
      .then(res => {
        dispatch({
          type: postTypes.UPDATE_POST_SUCCESS,
          payload: res.data
        });
      })
      .catch(function(error) {
          dispatch({
            type: postTypes.UPDATE_POST_ERROR,
            payload: 'Ошибка сервера'
          });
          console.log(error);
      });

    dispatch(hideLoader());
  };
};
