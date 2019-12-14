import postsReducer from './posts';
import usersReducer from './users';
import userReducer from './user';
import likingReducer from './liking';
import categoriesReducer from './categories';

const rootReducer = (state, action) => {
  const {posts, users, user, liking, categories} = state;

  return {
    posts: postsReducer(posts, action),
    users: usersReducer(users, action),
    user: userReducer(user, action),
    liking: likingReducer(liking, action),
    categories: categoriesReducer(categories, action),
  };
};

export default rootReducer;
