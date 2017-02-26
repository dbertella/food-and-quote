import { combineReducers } from 'redux';

const initialPosts = {
  isFetching: false,
  posts: [],
};

const posts = (state = initialPosts, action) => {
  console.log({[action.type]: action})
  switch (action.type) {
    case 'POSTS_REQUESTED':
      return {
        ...state,
        isFetching: true,
      };
    case 'POSTS_RECEIVED':
      return {
        ...state,
        isFetching: false,
        posts: action.posts,
      };
    default:
      return state;
  }
};

const initialPost = {
  isFetching: false,
};

const post = (state = initialPost, action) => {
  switch (action.type) {
    case 'POST_REQUESTED':
      return {
        ...state,
        isFetching: true,
      };
    case 'POST_RECEIVED':
      return {
        ...state,
        isFetching: false,
        [action.postId]: action.post,
      };
    default:
      return state;
  }
};

export default combineReducers({
  posts,
  post,
});