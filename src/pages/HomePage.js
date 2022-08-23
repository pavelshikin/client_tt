import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../store/actions';
import { postsByCategory } from '../utilits/postsByCategory';
import { Badge } from 'antd';
import {
  ProfileFilled,
  ShoppingFilled,
  VideoCameraFilled
} from '@ant-design/icons';
import s from '../styles/Home.module.scss';

const HomePage = () => {
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();
  const notes = postsByCategory(posts, 'notes');
  const products = postsByCategory(posts, 'products');
  const films = postsByCategory(posts, 'films');
  const books = postsByCategory(posts, 'books');

  let menuItems = [
    {
      count: products.length,
      text: 'Покупки',
      href: '/products',
      icon: <ShoppingFilled style={{ fontSize: 58 }} />
    },
    {
      count: notes.length,
      text: 'Заметки',
      href: '/notes',
      icon: <ProfileFilled style={{ fontSize: 58 }} />
    },
    {
      count: films.length + books.length,
      text: 'Фильмы/Книги',
      href: '/filmsandbooks',
      icon: <VideoCameraFilled style={{ fontSize: 58 }} />
    }
  ];

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className={s.items}>
        {menuItems.map(({ text, count, href, icon }, index) => (
          <Link to={href} key={index} className={s.item}>
            <div>
              <Badge count={count}>
                <div className={s.icon}>{icon}</div>
              </Badge>
              <h4 className={s.title}>{text}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
