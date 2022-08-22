import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { fetchPostsByCategory, fetchPosts } from '../store/actions';
import { postsByCategory, getCategoryByValue } from '../utilits/postsByCategory';
import NoteForm from '../components/Note/NoteForm';
import NoteList from '../components/Note/NoteList';

const CAT_NAME = 'products';
const CAT_ID = '60d788aee61f64154ce18551'

const ProductsPage = () => {
  const { isAdmin } = useAuth();
  const posts = useSelector(state => state.posts.posts);
  const allPostsCategory = useSelector(state => state.posts.postsByCategory);
  let products = postsByCategory(posts, CAT_NAME);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchPostsByCategory(CAT_ID));
    }
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container">
      <NoteForm catId={CAT_ID} catName={CAT_NAME} count={products.length} />
      <NoteList
        notes={products}
        allPosts={allPostsCategory}
        checkBox={isAdmin}
        checkDefault={isAdmin}
      />
    </div>
  );
};

export default ProductsPage;
