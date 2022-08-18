import React from 'react';
import s from '../../styles/Users.module.scss';
import { Link } from 'react-router-dom';

const UserItem = ({ user }) => {
  const link = '/user/' + user._id

  return (
    <>
      <Link to={{
        pathname: link,
        state: {user: user} }}
      >
        <div className={s.item}>
          <div className={s.title}>{user.username}</div>
        </div>
      </Link>
    </>
  );
};

export default UserItem;
