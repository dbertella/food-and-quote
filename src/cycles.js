import { combineCycles } from 'redux-cycles';
import xs from 'xstream';
import { intersection } from 'lodash';

import * as actions from './actions';
import * as ActionTypes from './constants';
import { BASE_URL } from './utils';

const fetchPostById = (sources) => {
  const post$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POST_REQUESTED)
    .map(action => action.postId);

  const request$ = post$
    .map(postId => ({
      url: `${BASE_URL}posts/${postId}`,
      category: 'post'
    }));

  const response$ = sources.HTTP
    .select('post')
    .flatten();

  const action$ = xs.combine(post$, response$)
    .map(arr => actions.receivePostById(arr[0], arr[1].body));

  return {
    ACTION: action$,
    HTTP: request$
  }
}

// TODO refactor using xs
const sortPosts = (posts, tags) => {
  return posts.slice().sort((a, b) => {
    var tagALength = intersection(
      a.tags.map(el => el.toString()),
      tags.map(el => el.value)).length;
    var tagBLength = intersection(
      b.tags.map(el => el.toString()),
      tags.map(el => el.value)).length;
    if (tagALength > tagBLength) {
      return -1;
    }
    if (tagALength < tagBLength) {
      return 1;
    }
    return 0;
  });
}

const fetchPosts = (sources) => {
  const posts$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POSTS_REQUESTED)
    .map(action => action.tags);

  const request$ = posts$
    .map(tags => ({
      url: `${BASE_URL}posts?per_page=100&tags=${encodeURIComponent(tags.map(tag => tag.value).join())}`,
      category: 'posts'
    }))
  
  const response$ = sources.HTTP
    .select('posts')
    .flatten();
  
  const action$ = xs.combine(response$, posts$)
    .map(arr => actions.receivePosts(sortPosts(arr[0].body, arr[1])));

  return {
    ACTION: action$,
    HTTP: request$
  }
}

export default combineCycles(fetchPosts, fetchPostById);