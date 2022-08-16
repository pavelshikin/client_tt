export const postsByCategory = (posts, value) => {
  let postsArray = [];

  posts.forEach(post =>
    post.category.filter(category => {
      if (category.name === value) postsArray.push(post);
      return null;
    })
  );
  return postsArray;
};

export const postsByCategoryId = (posts, id) => {
  let postsArray = [];

  postsArray = posts.filter(post => post.category[0] === id);

  return postsArray;
};
