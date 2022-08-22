import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { fetchPosts, fetchPostsByCategory } from '../store/actions';
import { postsByCategory, getCategoryByValue } from '../utilits/postsByCategory';
import NoteForm from '../components/Note/NoteForm';
import NoteList from '../components/Note/NoteList';

const NOTES = 'notes';

const NotesPage = () => {
  const { user, isOwner  } = useAuth();
  const posts = useSelector(state => state.posts.posts);
  const allPosts = useSelector(state => state.posts.postsByCategory);
  const category = getCategoryByValue(posts, NOTES);
  const dispatch = useDispatch();
  let notes = postsByCategory(posts, NOTES);

  useEffect(() => {
    if (isOwner) {
      dispatch(fetchPostsByCategory(category._id));
    }
    dispatch(fetchPosts());
  }, [dispatch, user]);

  return (
    <div className="container">
      <NoteForm catId={category._id} catName={NOTES} count={notes.length} />
      <NoteList notes={notes} allPosts={allPosts} checkBox={isOwner} />
    </div>
  );
};

export default NotesPage;
