import { combineCycles } from 'redux-cycles';
import sampleCombine from 'xstream/extra/sampleCombine';
import { intersection } from 'lodash';

import * as actions from './actions';
import * as ActionTypes from './constants';
import { BASE_URL } from './utils';

const fetchPostById = (sources) => {
  const postIds$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POST_REQUESTED)
    .map(action => action.postId);

  const request$ = postIds$
    .map(postId => ({
      url: `${BASE_URL}posts/${postId}`,
      category: 'post'
    }));

  const response$ = sources.HTTP
    .select('post')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(postIds$))
    .map(([ response, postIds ]) => actions.receivePostById(postIds, response.body))

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
  const tags$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POSTS_REQUESTED)
    .map(action => action.tags);

  const request$ = tags$
    .map(tags => ({
      url: `${BASE_URL}posts?per_page=100&tags=${encodeURIComponent(tags.map(tag => tag.value).join())}`,
      category: 'posts'
    }))

  const response$ = sources.HTTP
    .select('posts')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(tags$))
    .map(([ response, tags ]) => actions.receivePosts(sortPosts(response.body, tags)));

  return {
    ACTION: action$,
    HTTP: request$
  }
}

export default combineCycles(fetchPostById, fetchPosts);