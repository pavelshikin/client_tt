import api from '../../utilits/api';
import { userTypes } from '../types';
import { showLoader, hideLoader, showError } from './';

export const fetchUsers = () => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .get(`users`)
      .then(res => {
        dispatch({
          type: userTypes.FETCH_ALL_USERS_SUCCESS,
          payload: res.data
        });
      })
      .catch(function(error) {
        dispatch({
          type: userTypes.FETCH_ALL_USERS_ERROR,
          payload: 'Ошибка загрузки списка пользователей'
        });
        dispatch(showError('Ошибка загрузки списка пользователей'));
        console.log(error);
      });

    dispatch(hideLoader());
  };
};

export const fetchUserById = id => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .get(`users/${id}`)
      .then(res => {
        dispatch({
          type: userTypes.FETCH_USER_SUCCESS,
          payload: res.data
        });
      })
      .catch(function(error) {
          dispatch({
            type: userTypes.FETCH_USER_ERROR,
            payload: 'Ошибка загрузки пользователя'
          });
          dispatch(showError('Ошибка загрузки пользователя'));
          console.log(error);
      });

    dispatch(hideLoader());
  };
};

// export const createPost = post => {
//   const { title, content, categoryId, categoryName } = post;

//   return async dispatch => {
//     dispatch(showLoader());

//     await api
//       .post(`posts`, { title, content, categoryId })
//       .then(res => {
//         const newPost = {
//           _id: res.data._id,
//           title,
//           content,
//           category: [
//             {
//               _id: categoryId,
//               name: categoryName
//             }
//           ]
//         };
//         dispatch({
//           type: postTypes.CREATE_POST_SUCCESS,
//           payload: newPost
//         });
//       })
//       .catch(function(error) {
//         if (error.response.status === 403) {
//           dispatch({
//             type: postTypes.CREATE_POST_ERROR,
//             payload: error.response.data.message || 'Ошибка сервера'
//           });
//         } else {
//           dispatch({
//             type: postTypes.CREATE_POST_ERROR,
//             payload: 'Ошибка сервера'
//           });
//           console.log(error);
//         }
//       });

//     dispatch(hideLoader());
//   };
// };

// export const removePost = id => {
//   return async dispatch => {
//     dispatch(showLoader());

//     await api
//       .delete(`posts/${id}`)
//       .then(res => {
//         dispatch({
//           type: postTypes.DELETE_POST_SUCCESS,
//           payload: res.data
//         });
//       })
//       .catch(function(error) {
//           dispatch({
//             type: postTypes.DELETE_POST_ERROR,
//             payload: 'Ошибка'
//           });
//           console.log(error.response);
//       });

//     dispatch(hideLoader());
//   };
// };

// export const updatePost = post => {
//   return async dispatch => {
//     dispatch(showLoader());

//     await api
//       .put(`posts`, post)
//       .then(res => {
//         dispatch({
//           type: postTypes.UPDATE_POST_SUCCESS,
//           payload: res.data
//         });
//       })
//       .catch(function(error) {
//           dispatch({
//             type: postTypes.UPDATE_POST_ERROR,
//             payload: 'Ошибка сервера'
//           });
//           console.log(error);
//       });

//     dispatch(hideLoader());
//   };
// };
