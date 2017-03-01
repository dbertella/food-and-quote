// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

import * as actions from './actions';
import { createMarkup } from './utils';
import type { Post } from './types';

class Page extends Component {
  props: {
    post: Post,
    match: Object,
    requestPostById: Function,
    isFetching: boolean,
    goBack: Function,
  }
  componentDidMount() {
    const { match, post, requestPostById } = this.props;
    if (!post.title) {
      requestPostById(match.params.id);
    }
  }

  render() {
    const {
      post,
      isFetching,
      goBack,
    } = this.props;
    if (isFetching && !!post.title) {
      return <div>Loading...</div>
    }
    return (
      <div className="container">
        <Helmet
          htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
          title={post.title ? post.title.rendered : post.slug}
          titleTemplate="Food and quote - %s"
          defaultTitle="Food and quote"
          titleAttributes={{itemprop: "name", lang: "en"}}
          base={{target: "_blank", href: "https://foodandquote.com"}}
          meta={[
              {name: "description", content: "3 ingredient recipes and parenting quotes"},
              {property: "og:type", content: "article"}
          ]}
          link={[
              {rel: "canonical", href: post.link},
          ]}
      />
        {
          post.title &&
            <div>
              <button onClick={goBack}>Back</button>
              <h2 dangerouslySetInnerHTML={createMarkup(post.title.rendered)} />
              <img src={`${post.featured_media_url}?w=640&h=360&crop=1`} alt={post.title.rendered} />
              <div dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = {
    ...state.post[ownProps.match.params.id]
  };
  return ({
    post,
    isFetching: state.post.isFetching,
  })
};

export default connect(
  mapStateToProps, {
  requestPostById: actions.requestPostById,
})(Page);
