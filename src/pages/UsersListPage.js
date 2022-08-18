import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions';
import UsersList from '../components/User/UsersList';

const UsersListPage = () => {
  const users = useSelector(state => state.users.users);
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);

  return (
    <div className="container">
      <UsersList users={users} />
    </div>
  );
}

export default UsersListPage;


