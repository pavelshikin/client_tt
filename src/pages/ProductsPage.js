import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { fetchPostsByCategory, fetchPosts } from '../store/actions';
import { postsByCategory, getCategoryByValue } from '../utilits/postsByCategory';
import NoteForm from '../components/Note/NoteForm';
import NoteList from '../components/Note/NoteList';

const PRODUCTS = 'products';

const ProductsPage = () => {
  const { isAdmin } = useAuth();
  const posts = useSelector(state => state.posts.posts);
  const allPostsCategory = useSelector(state => state.posts.postsByCategory);
  const category = getCategoryByValue(posts, PRODUCTS);
  let products = postsByCategory(posts, PRODUCTS);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchPostsByCategory(category._id));
    }
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container">
      <NoteForm catId={category._id} catName={PRODUCTS} count={products.length} />
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
