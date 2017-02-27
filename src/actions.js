// @flow
import * as types from './constants';

export const requestPosts = (tags: Array<string>) => ({
  type: types.POSTS_REQUESTED,
  tags,
});

export const receivePosts = (posts: Object) => ({
  type: types.POSTS_RECEIVED,
  posts,
});

export const requestPostById = (postId: number) => ({
  type: types.POST_REQUESTED,
  postId,
});

export const receivePostById = (postId: number, post:Object) => {
  console.log({ postId })
  return ({
  type: types.POST_RECEIVED,
  postId,
  post,
})};
