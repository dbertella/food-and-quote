// @flow
const types = {
  POSTS_REQUESTED: 'POSTS_REQUESTED',
  POSTS_RECEIVED: 'POSTS_RECEIVED',
  POST_REQUESTED: 'POST_REQUESTED',
  POST_RECEIVED: 'POST_RECEIVED',
  HANDLE_TAGS: 'HANDLE_TAGS',
  TAGS_REQUESTED: 'TAGS_REQUESTED',
  TAGS_RECEIVED: 'TAGS_RECEIVED',
}

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

export const receivePostById = (postId: number, post:Object) => ({
  type: types.POST_RECEIVED,
  postId,
  post,
});

export const handleTags = (tags: Array<{| value: string, label: string |}>) => ({
  type: types.HANDLE_TAGS,
  tags,
})

export const requestTags = (postId: number) => ({
  type: types.TAGS_REQUESTED,
  postId,
});

export const receiveTags = (postId: number, post:Object) => ({
  type: types.TAGS_RECEIVED,
  postId,
  post,
});

export default types;