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
import { Modal, Checkbox, Button } from 'antd';

import { Btn } from '../theme';
import { deleteUser, addRole, removeRole } from '../store/actions';

import s from '../styles/Users.module.scss';

const { confirm } = Modal;
const allRoles = [
  'OWNER', 'USER', 'ADMIN'
]

const UserDetailsPage = () => {
  const { isOwner, user } = useAuth();
  const {state} = useLocation();
  const error = useSelector(state => state.app.error);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const thisUser = state?.user || user
  const [userRoles, setUserRoles] = useState(thisUser.roles)

  const removeUser = id => {
    dispatch(deleteUser(id));
    if (!error){
      history.push('/users')
    }
  };

  const getRoles = roles => {
    let string ='';
    for (let i = 0; i < roles.length; i++) {
      let sign = (i === roles.length - 1) ? '' : ', ';
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
      <div className={s.wrap}>
        <div className={s.details}>
        <div className={s.label}>Имя: <span>{thisUser.username}</span></div>
        <div className={s.label}>Email: <span>{thisUser.email}</span></div>
        <div className={s.label}>Роль: <span>{getRoles(thisUser.roles)}</span></div>
      </div>

      {
        isOwner
        ? <div className={s.actions}>
          {/* <Btn onClick={() => setEdit(true)}>Сменить пароль</Btn> */}
          <Btn onClick={() => setShowForm(!showForm)}><UsergroupAddOutlined /> Управление ролями</Btn>
          <Btn onClick={showConfirm} className={s.deleteUser}><UserDeleteOutlined /> Удалить</Btn>
          { showForm && isOwner ? <div className={s.form}>{roleForm()}</div>  : '' }
        </div>
        : ''
      }



      </div>
    </div>
  );
}

export default UserDetailsPage;


