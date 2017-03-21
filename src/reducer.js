import { combineReducers } from 'redux';
import { default as ActionTypes } from './actions';

const initialPosts = {
  isFetching: false,
  list: [],
};
// action.tags.length ? 'list' : action.tags.join('_')

const posts = (state = initialPosts, action) => {
  console.log({[action.type]: action})
  switch (action.type) {
    case ActionTypes.POSTS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.POSTS_RECEIVED:
      const newState = {
        ...state,
        isFetching: false,
        page: action.page,
        maxPages: action.maxPages,
      }
      if (action.tags.length) {
        newState[action.tags.join('_')] = state[action.tags.join('_')]
          ? [
            ...state[action.tags.join('_')],
            ...action.posts
          ]
          : action.posts;
        return newState;
      }
      newState.list = [
        ...state.list,
        ...action.posts
      ];
      return newState;
    default:
      return state;
  }
};

const initialPost = {
  isFetching: false,
};

const post = (state = initialPost, action) => {
  switch (action.type) {
    case ActionTypes.POST_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.POST_RECEIVED:
      return {
        ...state,
        isFetching: false,
        [action.postId]: action.post,
      };
    default:
      return state;
  }
};

const tags = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.HANDLE_TAGS:
      return action.tags;
    default:
      return state;
  }
};

export default combineReducers({
  posts,
  post,
  tags
});