import React, {useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ExclamationCircleOutlined,
  UsergroupAddOutlined,
  UserDeleteOutlined
} from '@ant-design/icons';
import { Modal, Checkbox } from 'antd';

import { Btn } from '../theme';
import { deleteUser, addRole, removeRole } from '../store/actions';

import s from '../styles/Users.module.scss';

const { confirm } = Modal;
const allRoles = [
  'OWNER', 'USER', 'ADMIN'
]

const UserDetailsPage = () => {
  const { isOwner } = useAuth();
  const {state} = useLocation();
  const error = useSelector(state => state.app.error);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userRoles, setUserRoles] = useState(state.user.roles)

  const removeUser = id => {
    dispatch(deleteUser(id));
    if (!error){
      history.push('/users')
    }
  };

  const getRoles = roles => {
    let string ='';
    for (let i = 0; i < roles.length; i++) {
      let sign = (i === roles.length - 1) ? '.' : ', ';
      string = string + roles[i] + sign
    }
    return string;
  }

  const showConfirm = () => {
    confirm({
        icon: <ExclamationCircleOutlined />,
        content: 'Вы точно хотите удалть пользователя?',
        okText: 'Подтвердить',
        cancelText: 'Отмена',

        onOk() {
          removeUser(state.user._id)
        }
      });
  }

  const roleForm = () => {
    return allRoles.map((role, idx) =>
      <div className={s.row} key={idx}>
        <span className={s.role}>{role} </span>
        <Checkbox
          onChange={() => changeRole(role)}
          checked={checkRole(role)}
          className={s.check}
        />
      </div>
    );
  }

  const checkRole = (role) => {
    if (userRoles && userRoles.indexOf(role) > -1) {
      return true;
    } else {
      return false;
    }
  }

  const changeRole = r => {
    let newRolesArray;

    if (userRoles && userRoles.indexOf(r) > -1) {
      newRolesArray = userRoles.filter((role) => {
        return role !== r
      })
      setUserRoles(newRolesArray)
      dispatch(removeRole(state.user._id, r));
    } else {
      newRolesArray = userRoles.concat([r])
      setUserRoles(newRolesArray)
      dispatch(addRole(state.user._id, r));
    }
  };

  return (
    <div className="container">
      <div className={s.details}>
        <div className={s.label}>Имя: {state.user.username}</div>
        <div className={s.label}>Email: {state.user.email}</div>
        <div className={s.label}>Роль: {getRoles(state.user.roles)}</div>
      </div>

      {
        isOwner
        ? <div className={s.actions}>
          {/* <Btn onClick={() => setEdit(true)}>Сменить пароль</Btn> */}
          <Btn onClick={() => setShowForm(!showForm)}><UsergroupAddOutlined /> Управление ролями</Btn>
          <Btn onClick={showConfirm}><UserDeleteOutlined /> Удалить</Btn>
        </div>
        : ''
      }

      { showForm && isOwner ? <div className={s.form}>{roleForm()}</div>  : '' }
    </div>
  );
}

export default UserDetailsPage;


