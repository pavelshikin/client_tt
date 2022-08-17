import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';

const UsersListPage = () => {
  const { user } = useAuth();
  const users = useSelector(state => state.posts.posts);
  const allPosts = useSelector(state => state.posts.postsByCategory);

  return (
    <div className="container">Список пользователей</div>
  );
}

export default UsersListPage;


