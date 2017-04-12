import { combineReducers } from 'redux';
import { default as ActionTypes } from './actions';

const initialPosts = {
  isFetching: false,
  list: [],
};
// action.tags.length ? 'list' : action.tags.join('_')

const posts = (state = initialPosts, action) => {
  console.log(action.page, action.maxPages)
  switch (action.type) {
    case ActionTypes.POSTS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.POSTS_RECEIVED:
      return {
        ...state,
        isFetching: false,
        page: action.page,
        maxPages: action.maxPages,
        list: action.posts,
      }
    case ActionTypes.MORE_POSTS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.MORE_POSTS_RECEIVED:
      return {
        ...state,
        isFetching: false,
        page: action.page,
        maxPages: action.maxPages,
        list: [
          ...state.list,
          ...action.posts,
        ],
      }
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