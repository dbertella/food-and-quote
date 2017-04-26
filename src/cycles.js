import { combineCycles } from 'redux-cycles';
import sampleCombine from 'xstream/extra/sampleCombine';
import xs from 'xstream';

import * as actions from './actions';
import { default as ActionTypes } from './actions';
import { BASE_URL } from './utils';

const POST_NUMBER = 20;

const CATEGORIES_FILTER = [
  'starter',
  'side-dish',
  'main-course',
  'dessert',
  'how-to',
];

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
    var tagALength = tags.filter(tag => a.tags[tag]).length;
    var tagBLength = tags.filter(tag => b.tags[tag]).length;
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

  const page$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POSTS_REQUESTED)
    .map(action => action.page);

  const request$ = xs.combine(tags$, page$)
    .map(([tags, page]) => ({
      url: `${BASE_URL}posts?`
        + `page=${page}`
        + `&number=${POST_NUMBER}`
        + `&category=${encodeURIComponent(CATEGORIES_FILTER.join())}`
        + `&tag=${encodeURIComponent(tags.map(tag => tag.value).join())}`,
      category: 'posts'
    }))

  const response$ = sources.HTTP
    .select('posts')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(tags$, page$))
    .map(([ response, tags, page ]) => {
      const maxPages = Math.ceil(response.body.found / POST_NUMBER);
      const flattenTags = tags.map(tag => tag.value);
      const posts = tags.length ? sortPosts(response.body.posts, flattenTags) : response.body.posts;
      return actions.receivePosts(posts, page, maxPages, flattenTags);
    });

  return {
    ACTION: action$,
    HTTP: request$
  }
}

const fetchMorePosts = (sources) => {
  const tags$ = sources.ACTION
    .filter(action => action.type === ActionTypes.MORE_POSTS_REQUESTED)
    .map(action => action.tags);

  const page$ = sources.ACTION
    .filter(action => action.type === ActionTypes.MORE_POSTS_REQUESTED)
    .map(action => action.page);

  const request$ = xs.combine(tags$, page$)
    .map(([tags, page]) => ({
      url: `${BASE_URL}posts?`
        + `page=${page}`
        + `&number=${POST_NUMBER}`
        + `&category=${encodeURIComponent(CATEGORIES_FILTER.join())}`
        + `&tag=${encodeURIComponent(tags.map(tag => tag.value).join())}`,
      category: 'moreposts'
    }))

  const response$ = sources.HTTP
    .select('moreposts')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(tags$, page$))
    .map(([ response, tags, page ]) => {
      const maxPages = Math.ceil(response.body.found / POST_NUMBER);
      const flattenTags = tags.map(tag => tag.value);
      const posts = tags.length ? sortPosts(response.body.posts, flattenTags) : response.body.posts;
      return actions.receiveMorePosts(posts, page, maxPages, flattenTags);
    });

  return {
    ACTION: action$,
    HTTP: request$
  }
}

const fetchPostsByCategory = (sources) => {
  const category$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POSTS_REQUESTED_BY_CATEGORY)
    .map(action => action.category);

  const page$ = sources.ACTION
    .filter(action => action.type === ActionTypes.POSTS_REQUESTED_BY_CATEGORY)
    .map(action => action.page);

  const request$ = xs.combine(category$, page$)
    .map(([category, page]) => ({
      url: `${BASE_URL}posts?`
        + `page=${page}`
        + `&number=${POST_NUMBER}`
        + `&category=${category}`,
      category: 'posts'
    }))

  const response$ = sources.HTTP
    .select('posts')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(category$, page$))
    .map(([ response, category, page ]) => {
      const maxPages = Math.ceil(response.body.found / POST_NUMBER);
      return actions.receivePosts(response.body.posts, page, maxPages, []);
    });

  return {
    ACTION: action$,
    HTTP: request$
  }
}

const fetchMorePostsByCategory = (sources) => {
  const category$ = sources.ACTION
    .filter(action => action.type === ActionTypes.MORE_POSTS_REQUESTED_BY_CATEGORY)
    .map(action => action.category);

  const page$ = sources.ACTION
    .filter(action => action.type === ActionTypes.MORE_POSTS_REQUESTED_BY_CATEGORY)
    .map(action => action.page);

  const request$ = xs.combine(category$, page$)
    .map(([category, page]) => ({
      url: `${BASE_URL}posts?`
        + `page=${page}`
        + `&number=${POST_NUMBER}`
        + `&category=${category}`,
      category: 'moreposts'
    }))

  const response$ = sources.HTTP
    .select('moreposts')
    .flatten();

  const action$ = response$
    .compose(sampleCombine(category$, page$))
    .map(([ response, category, page ]) => {
      const maxPages = Math.ceil(response.body.found / POST_NUMBER);
      return actions.receiveMorePosts(response.body.posts, page, maxPages, []);
    });

  return {
    ACTION: action$,
    HTTP: request$
  }
}

export default combineCycles(fetchPostById, fetchPosts, fetchMorePosts, fetchPostsByCategory, fetchMorePostsByCategory);