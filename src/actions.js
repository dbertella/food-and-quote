// @flow
const types = {
  POSTS_REQUESTED: 'POSTS_REQUESTED',
  POSTS_REQUESTED_BY_CATEGORY: 'POSTS_REQUESTED_BY_CATEGORY',
  POSTS_RECEIVED: 'POSTS_RECEIVED',
  MORE_POSTS_REQUESTED: 'MORE_POSTS_REQUESTED',
  MORE_POSTS_REQUESTED_BY_CATEGORY: 'MORE_POSTS_REQUESTED_BY_CATEGORY',
  MORE_POSTS_RECEIVED: 'MORE_POSTS_RECEIVED',
  POST_REQUESTED: 'POST_REQUESTED',
  POST_RECEIVED: 'POST_RECEIVED',
  HANDLE_TAGS: 'HANDLE_TAGS',
  TAGS_REQUESTED: 'TAGS_REQUESTED',
  TAGS_RECEIVED: 'TAGS_RECEIVED',
}

export const requestPosts = (tags: Array<string>, page: number = 1) => ({
  type: types.POSTS_REQUESTED,
  tags,
  page,
});

export const requestMorePosts = (tags: Array<string>, page: number = 1) => ({
  type: types.MORE_POSTS_REQUESTED,
  tags,
  page,
});

export const requestPostsByCategory = (category: string, page: number = 1) => ({
  type: types.POSTS_REQUESTED_BY_CATEGORY,
  category,
  page,
});

export const requestMorePostsByCategory = (category: string, page: number = 1) => ({
  type: types.MORE_POSTS_REQUESTED_BY_CATEGORY,
  category,
  page,
});

export const receivePosts = (posts: Array<Object>, page: number, maxPages: number, tags: Array<string>) => ({
  type: types.POSTS_RECEIVED,
  posts,
  page,
  maxPages,
  tags,
});

export const receiveMorePosts = (posts: Array<Object>, page: number, maxPages: number, tags: Array<string>) => ({
  type: types.MORE_POSTS_RECEIVED,
  posts,
  page,
  maxPages,
  tags,
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