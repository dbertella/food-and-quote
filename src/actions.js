// @flow
import * as types from './constants';

export const requestPosts = (tags: Array<string>) => ({
  type: types.POSTS_REQUESTED,
  tags,
});

export const receivePosts = (posts) => ({
  type: types.POSTS_RECEIVED,
  posts,
});

export const requestPostById = (postId) => ({
  type: types.POST_REQUESTED,
  postId,
});

export const receivePostById = (postId, post) => ({
  type: types.POST_RECEIVED,
  postId,
  post,
});
