import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsByCategory, getCategoryByValue } from '../utilits/postsByCategory';
import { Tabs } from 'antd';
import NoteList from '../components/Note/NoteList';
import NoteForm from '../components/Note/NoteForm';
import s from '../styles/Films.module.scss';
import { VideoCameraOutlined, ReadOutlined } from '@ant-design/icons';
import { fetchPosts } from '../store/actions';

const { TabPane } = Tabs;

const FILMS = 'films'
const BOOKS = 'books'

const FilmsAndBooksPage = () => {
  const posts = useSelector(state => state.posts.posts);
  const films = postsByCategory(posts, FILMS);
  const books = postsByCategory(posts, BOOKS);
  const catFilms = getCategoryByValue(posts, FILMS);
  const catBooks = getCategoryByValue(posts, BOOKS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container" style={{ maxWidth: 900 }}>
      <Tabs
        defaultActiveKey="1"
        centered={true}
        size="large"
        tabBarGutter={100}
        className={s.tabs}
      >
        <TabPane
          tab={
            <span className={s.tab}>
              <VideoCameraOutlined />
              Фильмы
            </span>
          }
          key="1"
        >
          <NoteForm catId={catFilms._id} catName={FILMS} />
          <NoteList notes={films} />
        </TabPane>
        <TabPane
          tab={
            <span className={s.tab}>
              <ReadOutlined />
              Книги
            </span>
          }
          key="2"
        >
          <NoteForm catId={catBooks._id} catName={BOOKS} />
          <NoteList notes={books} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FilmsAndBooksPage;
