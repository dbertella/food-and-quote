import { combineCycles } from 'redux-cycles';
import sampleCombine from 'xstream/extra/sampleCombine';

import * as actions from './actions';
import { default as ActionTypes } from './actions';
import { BASE_URL } from './utils';

const fetchPostById = (sources) => {
  const postSlug$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POST_REQUESTED)
    .map(action => action.postId);

  const request$ = postSlug$
    .map(postSlug => ({
      url: `${BASE_URL}posts/slug:${postSlug}`,
      category: 'post'
    }));

  const response$ = sources.HTTP
    .select('post')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(postSlug$))
    .map(([ response, postSlug ]) => actions.receivePostById(postSlug, response.body))

  return {
    ACTION: action$,
    HTTP: request$
  }
}

const sortPosts = (posts, tags) => {
  return posts.slice().sort((a, b) => {
    var tagALength = tags.filter(tag => a.tags[tag.value]).length;
    var tagBLength = tags.filter(tag => b.tags[tag.value]).length;
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
      url: `${BASE_URL}posts?tag=${encodeURIComponent(tags.map(tag => tag.value).join())}`,
      category: 'posts'
    }))

  const response$ = sources.HTTP
    .select('posts')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(tags$))
    .map(([ response, tags ]) => actions.receivePosts(sortPosts(response.body.posts, tags)));

  return {
    ACTION: action$,
    HTTP: request$
  }
}

export default combineCycles(fetchPostById, fetchPosts);