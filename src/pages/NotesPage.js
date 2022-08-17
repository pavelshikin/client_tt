import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { fetchPosts, fetchPostsByCategory } from '../store/actions';
import { postsByCategory } from '../utilits/postsByCategory';
import NoteForm from '../components/Note/NoteForm';
import NoteList from '../components/Note/NoteList';

const NotesPage = () => {
  const { user, isOwner  } = useAuth();
  const posts = useSelector(state => state.posts.posts);
  const allPosts = useSelector(state => state.posts.postsByCategory);
  const dispatch = useDispatch();
  let notes = postsByCategory(posts, 'notes');

  useEffect(() => {
    if (isOwner) {
      dispatch(fetchPostsByCategory('60d732d173ec823842af9ad2'));
    }
    dispatch(fetchPosts());
  }, [dispatch, user]);

  return (
    <div className="container">
      <NoteForm catId={'60d732d173ec823842af9ad2'} catName={'notes'} count={notes.length} />
      <NoteList notes={notes} allPosts={allPosts} checkBox={isOwner} />
    </div>
  );
};

export default NotesPage;
