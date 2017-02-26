import { combineCycles } from 'redux-cycles';
import xs from 'xstream';

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

const fetchPosts = (sources) => {
  const posts$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POSTS_REQUESTED)
    .map(action => encodeURIComponent(action.tags.map(tag => tag.value).join()));

  const request$ = posts$
    .map(tags => ({
      url: `${BASE_URL}posts?per_page=100&tags=${tags}`,
      category: 'posts'
    }))
  
  const response$ = sources.HTTP
    .select('posts')
    .flatten();
  
  const action$ = xs.combine(response$, posts$)
    .map(arr => actions.receivePosts(arr[0].body));

  return {
    ACTION: action$,
    HTTP: request$
  }
}

export default combineCycles(fetchPosts, fetchPostById);