import React from 'react';
import { useLocation } from 'react-router';

const UserDetailsPage = () => {
  const {state} = useLocation();

  const getRoles = roles => {
    let string ='';
    for (let i = 0; i < roles.length; i++) {
      let sign = (i === roles.length - 1) ? '.' : ', ';
      string = string + roles[i] + sign
    }
    return string;

  }

  return (
    <div className="container">
      <div>Имя: {state.user.username}</div>
      <div>Роль: {getRoles(state.user.roles)}</div>
    </div>
  );
}

export default UserDetailsPage;


