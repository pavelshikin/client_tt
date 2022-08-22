import api from '../../utilits/api';
import { userTypes } from '../types';
import { showLoader, hideLoader, showError } from './';

const url = userTypes.USER_API_URL;

export const fetchUsers = () => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .get(url)
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
        .get(`${url}/${id}`)
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

export const createUser = user => {
  const { email, password, username } = user;

  return async dispatch => {
    dispatch(showLoader());

    await api
      .post('auth/registration', { email, password, username })
      .then(res => {
        const newUser = {
          _id: res.data.userId,
          roles: res.data.roles,
          email,
          username
        };
        dispatch({
          type: userTypes.CREATE_USER_SUCCESS,
          payload: newUser
        });
      })
      .catch(function(error) {
        if (error.response && error.response.status === 403) {
          dispatch({
            type: userTypes.CREATE_USER_ERROR,
            payload: error.response.data.message || 'Ошибка сервера'
          });
        } else {
          dispatch({
            type: userTypes.CREATE_USER_ERROR,
            payload: 'Ошибка сервера'
          });
          console.log(error);
        }
      });

    dispatch(hideLoader());
  };
};

export const deleteUser= id => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .delete(`${url}/${id}`)
      .then(res => {
        dispatch({
          type: userTypes.DELETE_USER_SUCCESS,
          payload: res.data.id
        });
      })
      .catch(function(error) {
          dispatch({
            type: userTypes.DELETE_USER_ERROR,
            payload: 'Ошибка удаления пользователя'
          });
          dispatch(showError('Ошибка удаления пользователя'));
          console.log(error.response);
      });

    dispatch(hideLoader());
  };
};

export const addRole = (userId, value) => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .post(`${url}/role`, { userId, value })
      .then(res => {
        dispatch({
          type: userTypes.ADD_ROLE_USER_SUCCESS,
          payload: res.data
        });
      })
      .catch(function (error) {
        dispatch({
          type: userTypes.ADD_ROLE_USER_SUCCESS,
          payload: 'Ошибка добавление роли пользователя'
        });
        dispatch(showError('Ошибка добавление роли пользователя'));
        console.log(error.response);
      });

    dispatch(hideLoader());
  };
}

export const removeRole = (userId, value) => {
  return async dispatch => {
    dispatch(showLoader());

    await api
      .put(`${url}/role`, { userId, value })
      .then(res => {
        dispatch({
          type: userTypes.REMOVE_ROLE_USER_SUCCESS,
          payload: res.data
        });
      })
      .catch(function (error) {
        dispatch({
          type: userTypes.REMOVE_ROLE_USER_SUCCESS,
          payload: 'Ошибка снятие роли пользователя'
        });
        dispatch(showError('Ошибка снятие роли пользователя'));
        console.log(error.response);
      });

    dispatch(hideLoader());
  };
}


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
