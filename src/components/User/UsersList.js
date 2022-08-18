import React from 'react';
import s from '../../styles/Users.module.scss';
import UserItem from './UserItem';

const UsersList = ({ users }) => {

  const renderItems = users => {
    return users.map((user, idx) => <UserItem key={idx} user={user} />);
  };

  return (
    <div className={s.content}>
      {renderItems(users)}
    </div>
  );
};

export default UsersList;
